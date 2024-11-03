import { STUDENT } from "@/utils/schema";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req) {
  const data = await req.json();

  const result = await STUDENT.create({
    name: data?.name,
    grade: data?.grade,
    address: data?.address,
    contact: data?.contact,
  });

  return NextResponse.json(result);
}

export async function GET(req) {
  const result = await STUDENT.find();
  return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  // Remove the single quotes and convert to number
  const cleanedId = parseInt(id.replace(/'/g, ''), 10);

  if (isNaN(cleanedId)) {
    return NextResponse.json({ error: 'Invalid ID provided' }, { status: 400 });
  }

  try {
    const result = await STUDENT.deleteOne({ id: cleanedId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'No student found with the given ID' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}