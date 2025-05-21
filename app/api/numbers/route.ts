import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export type Number = {
    id: number;
    value: number;
}

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        const getAllNubers = await prisma.$queryRaw<Number[]>`SELECT * FROM "Number"`

        return new NextResponse(
            JSON.stringify(getAllNubers),
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
                message: 'Cannot isert value to "Number" table',
                error,
            }),
            { status: 500 }
         );
    }
};
