import { ATTENDANCE, STUDENT } from "@/utils/schema";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";
import moment from 'moment';

connectDB();

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const dateStr = searchParams.get('date');
    const grade = searchParams.get('grade');

    if (!dateStr || !grade) {
        return NextResponse.json({ error: 'Date and grade are required' }, { status: 400 });
    }

    const date = moment(dateStr, 'MM/YYYY');
    const startOfMonth = date.clone().startOf('month').toDate();
    const endOfMonth = date.clone().endOf('month').toDate();

    try {
        const result = await ATTENDANCE.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'studentId',
                    foreignField: 'id',
                    as: 'student'
                }
            },
            {
                $unwind: '$student'
            },
            {
                $match: {
                    'student.grade': grade
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: '$date' },
                    presentCount: {
                        $sum: { $cond: [{ $eq: ['$present', true] }, 1, 0] }
                    },
                    totalCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    day: '$_id',
                    presentCount: 1,
                    absentCount: { $subtract: ['$totalCount', '$presentCount'] },
                    _id: 0
                }
            },
            {
                $sort: { day: 1 }
            },
            {
                $limit: 7
            }
        ]);
        console.log("Query result:", result);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}