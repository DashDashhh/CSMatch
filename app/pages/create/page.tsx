'use client';
import './users.css'
import '../../(site)/components/navbar.css'
import '../../(site)/components/footer.css'

import Footer from "../../(site)/components/footer";
import { signOut } from "next-auth/react";

import Navbar from "@/app/(site)/components/navbar";

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';

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
        console.log(bioData)
        e.preventDefault();

        try {
            await fetch('/api/pushCardData',{
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
            console.log('Success')
        } catch(err) {
            console.log(err)
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

            }
            else {
                console.log("Error")
            }
        } catch(err) {
            console.log(err)
        }
        // Push Card Data AFTER pushing bio data

    }

    const onSubmit = async(e: any) => {
        try {
            pushBioData(e)
            pushCardData(e)
            .then(() => {router.push('/pages/internlist')})

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


    }, [internName, grade, experience, emailValue, phoneNumber, socials])
    
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