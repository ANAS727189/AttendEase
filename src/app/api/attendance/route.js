import { connectDB } from "@/utils/db";
import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const month = searchParams.get('month');

    if (!grade || !month) {
      return NextResponse.json({ error: 'Grade and month are required' }, { status: 400 });
    }

    const [monthNum, year] = month.split('/');
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    const result = await STUDENT.aggregate([
      { $match: { grade: grade } },
      {
        $lookup: {
          from: 'attendances',
          let: { studentId: '$id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$studentId', '$$studentId'] },
                    {
                      $or: [
                        { $eq: [{ $type: '$date' }, 'null'] },
                        {
                          $and: [
                            { $gte: ['$date', startDate] },
                            { $lte: ['$date', endDate] }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: 'attendance'
        }
      },
      { $unwind: { path: '$attendance', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          grade: 1,
          studentId: '$id',
          present: { $ifNull: ['$attendance.present', null] },
          date: { $ifNull: ['$attendance.date', null] },
          day: { $ifNull: ['$attendance.day', null] },
          attendanceId: { $ifNull: ['$attendance.id', null] }
        }
      }
    ]);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance data', details: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req, res) {
    const data = await req.json();
    console.log('Received data:', data);
  
    try {
      const { day, studentId, presentStatus, date } = data;
      const [month, year] = date.split('/');
      const attendanceDate = new Date(year, month - 1, day);
  
      // Check if an entry for this studentId and date already exists
      const existingEntry = await ATTENDANCE.findOne({
        studentId: studentId,
        date: attendanceDate
      });
  
      if (existingEntry) {
        // Update existing entry
        await ATTENDANCE.updateOne(
          { _id: existingEntry._id },
          { $set: { present: presentStatus } }
        );
      } else {
        // Create new entry
        await ATTENDANCE.create({
          studentId: studentId,
          present: presentStatus,
          date: attendanceDate,
          day: day
        });
      }
  
      return NextResponse.json({ message: 'Attendance record processed successfully' });
    } catch (error) {
      console.error('Error saving attendance record:', error);
      return NextResponse.json({ error: 'Error saving attendance record' }, { status: 500 });
    }
  }
  

  export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const date = searchParams.get('date');
    const day = searchParams.get('day');
  
    try {
      // Parse the date string correctly
      const [month, year] = date.split('/');
      const attendanceDate = new Date(year, month - 1, parseInt(day));
  
      const result = await ATTENDANCE.deleteOne({
        studentId: parseInt(studentId),
        date: attendanceDate,
        day: parseInt(day)
      });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: 'No matching record found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      return NextResponse.json({ error: 'Failed to delete attendance record' }, { status: 500 });
    }
  }