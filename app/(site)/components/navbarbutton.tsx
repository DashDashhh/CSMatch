"use client"; // This is a client component 👈🏽

import './navbar.css';

import { useState } from 'react'
import { useEffect } from 'react'

import { signOut } from 'next-auth/react';



const NBButton = (props: {
    buttonText: string, buttonLink: string, purpose: string
}) => {


    const {buttonText, buttonLink, purpose} = props

    const [buttonClass, changeVisibility] = useState('navbar__btn')


    const checkPurpose = () => {
        if (purpose==='logout') {
            console.log('signing out')
            signOut()
        }
    }

    return (
        
        <div className = {buttonClass} onClick={() => checkPurpose()}>
            <a href={buttonLink} id="sign-up" className="button">{buttonText}</a>
        </div>
    );
}
 
export default NBButton;