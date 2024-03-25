import {MongoClient} from 'mongodb';
import {NextResponse} from "next/server";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

// Send Card Data to mongo


export async function POST(request) {

  let body = await request.json();
  const user = await getCurrentUser();
  
  const data = await prisma.user.findUnique({
    where: {
        email: user.email
    }
});

  const dataId = data.id

  const hasCard = data.hasCard

  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://rgdewitty:rgdewitty@cluster0.vahi5yr.mongodb.net/test";

  const client = new MongoClient(uri);


  try {
    const database = client.db('test');
    const cardInfo = database.collection('UserCardInfo');
    const userData = database.collection('User')

    if (!hasCard) {
      const card = await cardInfo.insertOne({
        internName: body.internName,
        grade: body.grade,
        email: body.email,
        userId: data.id,
        pfpUrl: body.pfpUrl
      });

      const userUpdate = await userData.updateOne(
        {email: data.email},
        {$set: {
          hasCard: true
        }}
      )
      console.log('card created')
      return new NextResponse(card)

  
    } else if (hasCard) {
      const card = await cardInfo.updateOne(
        {userId: data.id},
        {$set: {
          internName: body.internName,
          grade: body.grade,
          email: body.email,
          pfpUrl: body.pfpUrl

        }}
      )

      console.log('updating card')
      return new NextResponse(card)

      }


  } catch(error) {
    console.log(error)
    return new NextResponse(error)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}