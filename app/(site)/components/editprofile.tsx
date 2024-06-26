'use client'
import './editprofile.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'
import { AiFillEdit } from "react-icons/ai";
import Image from 'next/image';

import Footer from "@/app/(site)/components/footer";
import { signOut } from "next-auth/react";

import Navbar from "@/app/(site)/components/navbar";

import { useState, useEffect } from 'react';
import { UploadButton } from '@/utils/uploadthing';

import toast from 'react-hot-toast';

// import getSession from 'next-auth/react';

import {useSession} from 'next-auth/react';


import { getCurrentUser } from '@/app/libs/session';

import prisma from "@/app/libs/prismadb";

import { redirect } from 'next/navigation';




const EditProfile = (props: any) => {

    const {dataset} = props
    console.log(`dataset: ${JSON.stringify(dataset)}`)




    const session = useSession()


    const [internName, setName] = useState(dataset.internName)
    const [grade, setGrade] = useState(dataset.grade)
    const [experience, setExperience] = useState(dataset.experience)
    const [emailValue, setEmailValue] = useState(dataset.email)
    const [phoneNumber, setPhoneNumber] = useState(dataset.phoneNumber)
    const [socials, setSocials] = useState(dataset.socials)
    const [description, setDesc] = useState(dataset.description)

    const [editToggle, setEditToggle] = useState(false)

    const [editButtonToggle, setEditButtonToggle] = useState(false)

    const [pfpUrl, setPfp] = useState(dataset.pfpUrl)

    const [resumeUrl, setResumeUrl] = useState(dataset.resumeUrl)

    const [resumeName, setResumeName] = useState(dataset.resumeName)
    

    const [bioData, setBioData] = useState({
        internName: '',
        grade: '',
        experience: '',
        email: '',
        phoneNumber: '',
        socials: '',
        description: '',
        pfpUrl: pfpUrl,
        resumeUrl: resumeUrl,
        resumeName: resumeName
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
    const handleDescChange = (event: any) => {
        setDesc(event.target.value);
    }
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
                    email: bioData.email,
                    pfpUrl: bioData.pfpUrl,
            })
            });
            if (response.ok) {
                console.log('Card Data successfully pushed')
                return (true)

            } else {
                console.log("PushCardData: Error")
                return (false)
            }
        } catch(err) {
            console.log(err)
            return (false)
        }

    }

    const pushBioData = async(e: any) => {
        console.log(`biodata: ${bioData}`)
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
                console.log('pushing to /pages/myprofile')
                toast.success('Success!')
                window.location.href=`/pages/myprofile`
            })

        } catch(error) {
            console.log(error)
        }



    }


    useEffect(() => {
        if (session?.status==='unauthenticated') {
            console.log('no session')
            window.location.href="/pages/login"
        }
    }, [session?.status])
    useEffect(() => {
        
        setBioData({
            ...bioData,
            internName: internName,
            grade: grade,
            experience: experience,
            email: emailValue,
            phoneNumber: phoneNumber,
            socials: socials,
            description: description,
            pfpUrl: pfpUrl,
            resumeUrl: resumeUrl,
            resumeName: resumeName
        })


    }, [internName, grade, experience, emailValue, phoneNumber, socials, description, pfpUrl, resumeUrl, resumeName])


    
    return (
        <div>
            {/* <!-- Navbar selection-->
            <!--All classNamees have two underscores--> */}
            <Navbar linkView = 'false' buttonView = 'true'/>
            <div className="profile__wrapper">
                <div className="bar1">
                    <div className="profile__picture" onMouseEnter={() => setEditToggle(!editToggle)} onMouseLeave={() => setEditToggle(!editToggle)} onClick={() => setEditButtonToggle(!editButtonToggle)}>
                        <Image src={pfpUrl} alt="Profile" width="100" height="100" className="profile__image"/>
                        {editToggle&& (
                            <div className='edit__icon'>
                                <AiFillEdit/>
                            </div>
                        )}
                    </div>
                    {editButtonToggle && (
                        <UploadButton endpoint="imageUploader" 
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            toast.success("Profile Picture Uploaded!")
                            setPfp(res[0].url);
                            setEditButtonToggle(false)
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                        />
                        
                    )

                    }





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

                    <h1>About me</h1>
                    <textarea name="Text1" id="userDescription" onChange={handleDescChange} value={description}></textarea>

                
                </div>



            </div>

            <div className="file__upload">
                <div className='upload__button'>
                    <h1>My Resume</h1>
                    <p>{resumeName}</p>

                    <UploadButton endpoint="pdfUpload" 
                    onClientUploadComplete={(res: any) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        toast.success("Resume Uploaded!")
                        setResumeUrl(res[0].url)
                        setResumeName(res[0].name)
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                    />

                </div>

            </div>

            <Footer/>

            

        </div>
    );
}

export default EditProfile;