'use client';

import './signupStyle.css'
import Navbar from "@/app/(site)/components/navbar";


import SignupHeader from '@/app/(site)/components/signupHeader';

import React, { useState } from 'react';
import { useEffect } from 'react'

import toast from 'react-hot-toast';
import {signIn, useSession} from 'next-auth/react';





function SignupContainer() {

    const session = useSession();

    const [isLoading, setIsLoading] = useState(false);

    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerStatus, setRegisterStatus] = useState('Register');
    const [userVisibility, setUserClass] = useState('invisible');

    const [extraLink, setExtraLink] = useState('/login');
    const [altLink, setAltLink] = useState('');


    const [regData, setMyObject] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [logData, setLogData] = useState({
        email: '',
        password: ''

    })

  
    const handleUserChange = (event: any) => {
        setUser(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleUserVisibility = () => {
        if (registerStatus === 'Login') {
            setUserClass(`input ${'invisible'}`)
        } else {
            setUserClass(`input`)
        }
    }

    const onSubmit = async() => {
        handleUserVisibility()
        if (registerStatus === 'Register') {
            setIsLoading(true);
            try {
                console.log(regData)
                const response = await fetch(`/api/register`,{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(regData)
                });
                signIn('credentials', {
                    ...regData, 
                    redirect: false
                })


                .then(() => {

                    console.log('Redirecting to /pages/create')

                    window.location.href=`/pages/create`
                    })

                setIsLoading(false)
                toast.success('Registered!');

                
            } catch(error: any) {
                console.log(error.response.data)
                toast.error(error.response.data)
            }

        }

    }
    useEffect(() => {

        if (session?.status==='authenticated') {
            console.log('Authenticated')
            window.location.href=`/pages/myprofile`
        }
    }, [])
    useEffect(() => {

        if (registerStatus === 'Register') {
            console.log('Registering')
            setMyObject({
                ...regData,
                name: username,
                email: email,
                password: password
            })
            setAltLink('Or log in')
            setExtraLink('/pages/login')
            handleUserVisibility()
        }

    
      }, [username, email, password]); 
    return (
        <>
            <Navbar linkView = 'false' buttonView = 'true'/>
            <SignupHeader registerStatus={registerStatus}/>
            <div className="tabs__wrapper">
                <div className="tabs">
                    <div className="tab">

                        <div className="tab__wrapper" id="tab--1">
                            <div className="fields">
                                <li className="field">
                                    <form className="field__wrapper">
                                        <input type='text' className={userVisibility} placeholder='Username' onChange={handleUserChange} value = {username}></input>
                                        <input type='text' className='input' placeholder='Email' onChange={handleEmailChange} value = {email}></input>
                                        <input type='password' className="input" placeholder='Password'onChange={handlePasswordChange} value = {password}></input>

                                        <button disabled={isLoading} className="submit__button" onClick={onSubmit}>Submit</button>
                                        <a className='link' href={extraLink}>{altLink}</a>

                                    </form>

                                </li>

                            </div>

                        </div>




                    </div>
                </div>
            </div>


        </>

    );
}
 
export default SignupContainer;