import mongoose from 'mongoose';


const mongo_uri = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};