import { getCurrentUser } from '@/app/libs/session';
import {NextResponse, NextRequest} from "next/server";

import prisma from "@/app/libs/prismadb";



export async function GET(request: any) {
        
    let req = await request


    const searchParams = req.nextUrl.searchParams

    const query = searchParams.get("email")

    const identifier = await prisma.user.findUnique({
        where: {
            // Don't worry about error
            email: query
        }



    })
    return new NextResponse(JSON.stringify(identifier))

}

