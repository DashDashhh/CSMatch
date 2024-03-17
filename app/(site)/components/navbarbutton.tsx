"use client"; // This is a client component 👈🏽

import './navbar.css';

import { useState } from 'react'
import { useEffect } from 'react'



const NBButton = (props: {
    buttonText: string, buttonLink: string, visible: string
}) => {

    const {buttonText, buttonLink, visible} = props

    const [buttonClass, changeVisibility] = useState('navbar__btn')

    function checkVisibility() {
        if (visible=='false') {
            changeVisibility('invisible')
        }
    }

    useEffect(() => {
        checkVisibility()
    
      }, []); // Empty dependency array ensures that the effect runs only once on mount

    return (
        
        <div className = {buttonClass}>
            <a href={buttonLink} id="sign-up" className="button">{buttonText}</a>
        </div>
    );
}
 
export default NBButton;