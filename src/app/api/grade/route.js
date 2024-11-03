import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import { GRADES } from "@/utils/schema";
import { STUDENT } from "@/utils/schema";

connectDB();

export async function GET(req) {
    const res = await GRADES.find();
    return NextResponse.json(res);
}