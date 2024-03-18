'use client';
import './users.css'
import '../../app/(site)/components/navbar.css'
import '../../app/(site)/components/footer.css'

import Footer from "@/app/(site)/components/footer";
import { signOut } from "next-auth/react";

import Navbar from "@/app/(site)/components/navbar";

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';


// API IMPORTS

import {MongoClient} from 'mongodb';
import {NextResponse} from "next/server";

import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";


// Send Card Data to mongo


// async function POST(request: any) {

//     let body = await request.json();
//     const user = await getCurrentUser();
    
//     const data = await prisma.user.findUnique({
//       where: {
//           email: user!.email!
//       }
//   });
  
//     const dataId = data!.id
  
//     const hasCard = data!.hasCard
  
//     // Replace the uri string with your connection string.
//     const uri = "mongodb+srv://rgdewitty:rgdewitty@cluster0.vahi5yr.mongodb.net/test";
  
//     const client = new MongoClient(uri);
  
  
//     try {
//       const database = client.db('test');
//       const cardInfo = database.collection('UserCardInfo');
//       const userData = database.collection('User')
  
//       if (!hasCard) {
//         const card = await cardInfo.insertOne({
//           internName: body.internName,
//           grade: body.grade,
//           email: body.email,
//           userId: data!.id
//         });
  
//         const userUpdate = await userData.updateOne(
//           {email: data!.email},
//           {$set: {
//             hasCard: true
//           }}
//         )
//         console.log('card created')
//         return JSON.stringify(card)
  
    
//       } else if (hasCard) {
//         const card = await cardInfo.updateOne(
//           {userId: data!.id},
//           {$set: {
//             internName: body.internName,
//             grade: body.grade,
//             email: body.email
//           }}
//         )
  
//         console.log('updating card')
//         return JSON.stringify(card)

  
//         }
  
  
//     } catch(error) {
//       console.log(error)
//       return new NextResponse('error')
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }

const InternBio = () => {

    const router = useRouter();

    const [internName, setName] = useState('')
    const [grade, setGrade] = useState('')
    const [experience, setExperience] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [socials, setSocials] = useState('')
    

    const [bioData, setBioData] = useState({
        internName: '',
        grade: '',
        experience: '',
        email: '',
        phoneNumber: '',
        socials: ''
    })


    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };
    const handleGradeChange = (event: any) => {
        setGrade(event.target.value);
    };
    const handleExperienceChange = (event: any) => {
        setExperience(event.target.value);
    };
    const handleEmailChange = (event: any) => {
        setEmailValue(event.target.value);
    };
    const handlePhoneChange = (event: any) => {
        setPhoneNumber(event.target.value);
    };
    const handleSocialChange = (event: any) => {
        setSocials(event.target.value);
    };

    const pushCardData = async(e: any) => {


        e.preventDefault();

        console.log(bioData)

        try {
            const response = await fetch(`/api/pushCardData`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    internName: bioData.internName,
                    grade: bioData.grade,
                    email: bioData.email
            })
            });
            if (response.ok) {
                console.log('Card Data successfully pushed')
                return (true)

            } else {
                console.log("PushCardData: Error")
                return (false)
            }
            // POST(bioData)
        } catch(err) {
            console.log(err)
            return (false)
        }

    }

    const pushBioData = async(e: any) => {
        console.log(bioData)
        e.preventDefault();

        try {

            const response = await fetch('/api/pushBioData',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(bioData)
            });
            if (response.ok) {
                console.log('Bio Data successfully pushed')
                return(true)

            }
            else {
                console.log("PushBioData: Error")
                return(false)
            }
        } catch(err) {
            console.log(err)
            return(false)
        }

    }

    const onSubmit = async(e: any) => {
        e.preventDefault()
        try {
            await pushBioData(e)
            await pushCardData(e)
            .then(() => {
                console.log('pushing to /pages/internlist')
                toast.success('Success!')
                // router.push(`/pages/internlist`)
                window.location.href=`/pages/internlist`
            })

        } catch(error) {
            console.log(error)
        }



    }


    useEffect(() => {
        setBioData({
            ...bioData,
            internName: internName,
            grade: grade,
            experience: experience,
            email: emailValue,
            phoneNumber: phoneNumber,
            socials: socials
        })


    }, [internName, grade, experience, emailValue, phoneNumber, socials, bioData])
    
    return (
        <div>
            {/* <!-- Navbar selection-->
            <!--All classNamees have two underscores--> */}
            <Navbar linkView = 'false' buttonView = 'true'/>
            <div className="profile__wrapper">
                <div className="bar1">
                    <h1 className="profile__picture"><i className="fas fa-user"></i></h1>
                    <div className="button__wrapper">
                        <a className="button" id="confirm" onClick={onSubmit}>Confirm</a> 
                        <a className="button" id="confirm" onClick={() => signOut()}>Logout</a>
                    </div>

                    <div className="information">
                    <ul className="basic__information">
                        <h1>Basic Information</h1>
                        <li>
                        <p>Full Name: </p>
                        <input className="userInput" value = {internName} onChange={handleNameChange}></input>
                        </li>
                        <li>
                        <p>Grade: </p>
                        <input className="userInput" value = {grade} onChange={handleGradeChange}></input>
                        </li>
                        <li>
                        <p>Looking for experience in:</p>
                        <input className="userInput" value = {experience} onChange={handleExperienceChange}></input>
                        </li>
                    </ul>  
                    <ul className="contact__information">
                        <h1>Contact Information</h1>
                        <li>
                        <p>Email: </p>
                        <input className="userInput" value = {emailValue} onChange={handleEmailChange}></input>
                        </li>
                        <li>
                        <p>Phone Number: </p>
                        <input className="userInput" value = {phoneNumber} onChange={handlePhoneChange}></input>
                        </li>
                        <li>
                        <p>Other Socials: </p>
                        <input className="userInput" value = {socials} onChange={handleSocialChange}></input>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="description__wrapper">

                    <div className="input__wrapper">
                        <h1>About me</h1>
                        <textarea name="Text1" id="userDescription"></textarea>
                    </div>

                
                </div>


            </div>

            <Footer/>

            

        </div>
    );
}
 
export default InternBio;