import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export type Grade = {
    id: number;
    subject: 'Math' | 'Science' | 'History';
    value: number;
}

// mark: Currently not in use. Created for debugging purposes.
export const GET = async () => {
    try {
        const grades = await prisma.$queryRaw<Grade[]>`SELECT * FROM "Grade"`

        return new NextResponse(
            JSON.stringify(grades),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Reading from "Grade" failed',
                error,
            }),
            { status: 500 }
         );
    }
};

export const POST = async (request: Request) => {
    try {
        const { value, subject } = await request.json();
        const createdGrades = await prisma.$queryRaw<Grade[]>`INSERT INTO "Grade" (value, class) VALUES (${value}, ${subject}::text::"Class") RETURNING *`;

        return new NextResponse(
            JSON.stringify(createdGrades),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Inserting to "Grade" table failed',
                error,
            }),
            { status: 500 }
         );
    }
};
