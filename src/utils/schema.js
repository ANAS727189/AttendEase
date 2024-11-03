import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

let GRADES, STUDENT, ATTENDANCE;

try {
  GRADES = mongoose.model("grades");
} catch (error) {
  const gradesSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    grade: { type: String, maxlength: 10, required: true },
  });

  gradesSchema.plugin(AutoIncrement, { 
    inc_field: "id",
    id: "grades_counter"  // Unique identifier for grades counter
  });
  GRADES = mongoose.model("grades", gradesSchema);
}

try {
  STUDENT = mongoose.model("students");
} catch (error) {
  const studentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, maxlength: 20, required: true },
    grade: { type: String, required: true, maxlength: 10 },
    address: { type: String, maxlength: 50 },
    contact: { type: Number, max: 99999999999 },
  });

  studentSchema.pre('save', async function(next) {
    if (this.isNew) {
      const maxId = await this.constructor.findOne({}, { id: 1 }).sort('-id');
      this.id = (maxId && maxId.id ? maxId.id : 0) + 1;
    }
    next();
  });

  STUDENT = mongoose.model("students", studentSchema);
}

try {
  ATTENDANCE = mongoose.model("attendance");
} catch (error) {
  const attendanceSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    studentId: { type: Number, required: true, ref: "students" },
    present: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true },
    day: { type: Number, required: true, maxlength: 11 },
  });

  // Add a pre-save hook similar to the student schema
  attendanceSchema.pre('save', async function(next) {
    if (this.isNew) {
      const maxId = await this.constructor.findOne({}, { id: 1 }).sort('-id');
      this.id = (maxId && maxId.id ? maxId.id : 0) + 1;
    }
    next();
  });

  ATTENDANCE = mongoose.model("attendance", attendanceSchema);
}


export { GRADES, STUDENT, ATTENDANCE };