import {NextResponse} from "next/server";
import { getCurrentUser } from '@/app/libs/session';
import prisma from "@/app/libs/prismadb";



// Send bio data to mongo

export async function getData() {


  const user = await getCurrentUser();
  const e = user!.email
  const data = await prisma.user.findUnique({
    where: {
        email: e!
    }
  });

  const profile = await prisma.userBioInfo.findUnique({
    where: {
      userId: data!.id
    }
  })

  return NextResponse.json(profile)

}
