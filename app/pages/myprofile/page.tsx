import './internbio.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import Footer from '@/app/(site)/components/footer';

import Navbar from "@/app/(site)/components/navbar";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

import MyProfile from '@/app/(site)/components/page';


const getData = async() => {

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
  return (profile)

}
const MyBio = async() => {

  
  let data = await getData()



  return (
      <MyProfile bio={data}/>
  );
}
 
export default MyBio;