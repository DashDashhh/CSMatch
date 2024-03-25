// API GET DATA FROM MONGO

import {NextResponse} from "next/server";


import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const bios = await prisma.userBioInfo.findMany();
        return new NextResponse(JSON.stringify(bios))
    } catch(error) {
        return new NextResponse(error)
    }

}

