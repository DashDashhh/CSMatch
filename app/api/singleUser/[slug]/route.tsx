
import {NextResponse} from "next/server";

import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function GET(request: any) {
    const url = new URL(request.url)
    const searchparams = new URLSearchParams(url.searchParams)
    const id = searchparams.get('id')

    

    try {
        const singleUser = await prisma.userBioInfo.findUnique({
            where: {
                userId: id!
            }
        });
        console.log(`singleUser: ${JSON.stringify(singleUser)}`)
        // return NextResponse.json(singleUser)
        return NextResponse.json(singleUser)
    } catch(error) {
        return new NextResponse('error')
    }

}

