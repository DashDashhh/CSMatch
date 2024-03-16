// API GET DATA FROM MONGO

import {NextResponse} from "next/server";


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const cards = await prisma.userCardInfo.findMany();
        return new NextResponse(JSON.stringify(cards))
    } catch(error) {
        return new NextResponse(error)
    }

}

