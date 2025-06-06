import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export type Number = {
    id: number;
    value: number;
}

export const GET = async () => {
    try {
        const numbers = await prisma.$queryRaw<Number[]>`SELECT * FROM "Number"`

        return new NextResponse(
            JSON.stringify(numbers),
            { status: 200 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Reading from "Number" failed',
                error,
            }),
            { status: 500 }
         );
    }
};

export const POST = async (request: Request) => {
    try {
        const { value } = await request.json();
        const createdNumbers = await prisma.$queryRaw<Number[]>`INSERT INTO "Number" (value) VALUES (${value}) RETURNING *`;

        return new NextResponse(
            JSON.stringify(createdNumbers),
            { status: 201 }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Inserting to "Nubmer" table failed',
                error,
            }),
            { status: 500 }
         );
    }
};
