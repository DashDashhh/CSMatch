'use client';

import './signupStyle.css'
import Navbar from '../../(site)/components/navbar';


import SignupHeader from '../../(site)/components/signupHeader';

import React, { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';

import toast from 'react-hot-toast';
import {signIn, useSession} from 'next-auth/react';

import { useRouter } from 'next/navigation';


function SignupContainer() {

    const session = useSession();
    const router = useRouter();

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
            // Create model
            try {
                const res = await axios.post('/api/register', regData)
                .then(() => signIn('credentials', regData))
                
                .finally(() => setIsLoading(false))
                toast.success('Registering you');

                
            } catch(error: any) {
                console.log(error.response.data)
                toast.error(error.response.data)
            }

        } else if (registerStatus ==='Login') {
            
            console.log(logData)
            setIsLoading(true)
            signIn('credentials', {
                ...logData,
                redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials');
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in');
                    router.push('/pages/create')
                }
            })

            .finally(() => setIsLoading(false));
        }

    }
    useEffect(() => {
        if (session?.status==='authenticated') {
            console.log('Authenticated')
            router.push('/pages/create')
        }
    }, [session?.status])
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
        } else if (registerStatus === 'Login') {
            console.log('Logging in')
            setLogData({
                ...logData,
                email: email,
                password: password
            })
            setAltLink('Or register')
            setExtraLink('/pages/signup')
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