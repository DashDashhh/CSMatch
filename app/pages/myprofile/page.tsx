import './internbio.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import Footer from '@/app/(site)/components/footer';

import Navbar from "@/app/(site)/components/navbar";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

import MyProfile from '@/app/(site)/components/page';
import { useRouter } from 'next/navigation'

import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'


const getData = async() => {

  try {
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
  } catch(error) {
    console.log(error)
    redirect('/pages/login')
    return(false)
  }


}
const MyBio = async() => {


  let data = await getData()

  return (
      <MyProfile bio={data}/>
  );
}
 
export default MyBio;