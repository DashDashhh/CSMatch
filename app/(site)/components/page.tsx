'use client'

import './myprofile.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import { signOut } from "next-auth/react";


import Footer from '@/app/(site)/components/footer';

import Navbar from "@/app/(site)/components/navbar";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import Image from 'next/image';

export const dynamic = 'force-dynamic'



const MyProfile = (props: any) => {

    const session = useSession()

    const {bio} = props

    useEffect(() => {
        if (session?.status==='unauthenticated') {
            console.log('no session')
            window.location.href="/pages/login"
        }
    }, [session?.status])

    return (
        <div>
            {/* <!-- Navbar selection-->
            <!--All classNamees have two underscores--> */}
            <Navbar linkView = 'false' buttonView = 'true'/>
            <div className="profile__wrapper">
                <div className="bar1">
                    <div className="profile__picture">
                            <Image src={bio.pfpUrl} alt="Profile" width="100" height="100" className="image"/>
                        </div>
                    <div className="button__wrapper">
                        <button className="button" id="confirm" onClick={() => signOut()}>Logout</button>
                        <button className="button" id="confirm" onClick={() => window.location.href='/pages/editprofile'}>Edit</button>
                        <button className="button" id="confirm" onClick={() => window.location.href='/pages/internlist'}>Other Interns</button>



                    </div>

                    <div className="information">
                    <ul className="basic__information">
                        <h1>Basic Information</h1>
                        <li>
                        <p>Name: {bio?.internName}</p>
                        </li>
                        <li>
                        <p>Grade: {bio?.grade}</p>
                        </li>
                        <li>
                        <p>Looking for experience in: {bio?.experience}</p>
                        </li>
                    </ul>  
                    <ul className="contact__information">
                        <h1>Contact Information</h1>
                        <li>
                        <p>Email: {bio?.email}</p>
                        </li>
                        <li>
                        <p>Phone Number: {bio?.phoneNumber}</p>
                        </li>
                        <li>
                        <p>Other Socials: {bio?.socials}</p>

                        </li>
                    </ul>
                    </div>
                </div>
                <div className="description">
                    <h1>About me</h1>
                    <div id="description__paragraph">{bio?.description}</div>
                </div>


                


            </div>

            <Footer/>

            

        </div>
    );
}
 
export default MyProfile;