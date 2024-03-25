import './users.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'


import EditProfile from '@/app/(site)/components/editprofile'

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

import { redirect } from 'next/navigation';


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
      console.log(profile)

      return (profile)
    } catch(error) {
      console.log(error)
      redirect('/pages/login')
      return(false)
    }
  
  
  }


const EditParent = async() => {
    const data = await getData()
    console.log(data)
    return (
        <EditProfile dataset={data}/>
    )
}

export default EditParent;