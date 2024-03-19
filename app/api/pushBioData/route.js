import {MongoClient} from 'mongodb';
import {NextResponse} from "next/server";
import { getCurrentUser } from '@/app/libs/session';
import prisma from "@/app/libs/prismadb";



// Send bio data to mongo

export async function POST(request) {

  const user = await getCurrentUser();

  const id = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  })


  let body = await request.json();

  console.log(body)


  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://rgdewitty:rgdewitty@cluster0.vahi5yr.mongodb.net/test";

    const client = new MongoClient(uri);

    try {
      const database = client.db('test');
      const bioInfo = database.collection('UserBioInfo');

      console.log(`userId: ${id.id}`)


      const data = await bioInfo.updateOne(
        {userId: id.id}, 
        {$set: {
          internName: body.internName,
          grade: body.grade,
          experience: body.experience,
          email: body.email,
          phoneNumber: body.phoneNumber,
          socials: body.socials,
          desc: body.desc
        }}

      );

      console.log('Bio Updated')
      return new NextResponse(data)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
