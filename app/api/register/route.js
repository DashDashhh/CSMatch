import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";


const prismaClient = new PrismaClient();

// Sign up

export async function POST(request) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;

  if (!email || !name || !password) {
    return new NextResponse('Missing info', {status: 400});
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  
  try {
    const singleUser = await prismaClient.userBioInfo.findUnique({
      where: {
          email: email
      }
    });


    if (!singleUser) {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          hasCard: false
        }
      });
      const bio = await prisma.userBioInfo.create({
        data:{
          internName: '',
          grade: '',
          experience: '',
          email: email,
          phoneNumber: '',
          socials: '',
          userId: user.id
        }
      })
      return NextResponse.json(user);

    } else {
      console.log('user already exists')
      return new NextResponse('User Already Exists Under That Email', {status: 400});

    }
  } catch(error) {
    return new NextResponse({status: 500}, error)
  }






}
