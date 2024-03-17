"use client"; // This is a client component 👈🏽


import './navbar.css'

import { useState } from 'react'

import { useEffect } from 'react'



const NBLink = (props: {
    linkText: string, visible: string
}) => {

    // visible optional prop

    const {linkText, visible} = props

    // let linkValue = 'none'
    const [linkStyle, highlightLink] = useState('invisible')

    
    const highlightMenu = () => {
        
        let scrollPos = window.scrollY

        //updating border property

        if (visible!='false') {
            if (window.innerWidth > 960 && scrollPos < 500 && linkText === 'Welcome') {
                highlightLink(`navbar__links ${'highlight'}`)
                console.log('welcome')
            } 
            else if (window.innerWidth > 960 && scrollPos < 1300 && scrollPos>500 && linkText === 'About Us') {
                highlightLink(`navbar__links ${'highlight'}`)
            }
            else if (window.innerWidth > 960 && scrollPos < 2100 && scrollPos > 1300 && linkText === 'Companies') {
                highlightLink(`navbar__links ${'highlight'}`)
            }
            else {
                highlightLink(`navbar__links`)
            }
    
        }


        // highlightLink(`navbar__links`)


    }
    useEffect(() => {
        highlightMenu()
    
        window.addEventListener('scroll', highlightMenu);
    
      }, []); // Empty dependency array ensures that the effect runs only once on mount
    
    return (
        <div className={linkStyle}>
            <a href="#top" id="home-page">{linkText}</a>
        </div>

    );



}
 
export default NBLink;