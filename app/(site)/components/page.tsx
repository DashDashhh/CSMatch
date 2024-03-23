'use client'

import './myprofile.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import { signOut } from "next-auth/react";


import Footer from '@/app/(site)/components/footer';

import Navbar from "@/app/(site)/components/navbar";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";




const MyProfile = (props: any) => {
    const {bio} = props
    return (
        <div>
            {/* <!-- Navbar selection-->
            <!--All classNamees have two underscores--> */}
            <Navbar linkView = 'false' buttonView = 'true'/>
            <div className="profile__wrapper">
                <div className="bar1">
                    <h1 className="profile__picture"><i className="fas fa-user"></i></h1>
                    <div className="button__wrapper">
                        <a className="button" id="confirm" onClick={() => signOut()}>Logout</a>

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