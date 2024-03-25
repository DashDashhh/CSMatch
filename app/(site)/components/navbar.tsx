'use client'
import './navbar.css';
import NBButton from './navbarbutton'
import NBLink from './navbarlink'

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Navbar = (props: {linkView: string, buttonView: string}) => {
    const session = useSession()

    const [authenticated, setAuthentication] = useState(false)

    const [displayUserActions, setUserActions] = useState(false)

    const redirect = (location: string) => {
        window.location.href=location
    }

    useEffect(() => {
        if (session?.status==='authenticated') {
            setAuthentication(true)
            setUserActions(false)
        } else {
            setUserActions(true)
        }
    }, [session?.status])

    const {linkView, buttonView} = props

    return (

            
        <nav className="navbar">
            <div className="navbar__container">
                <Image src='/logo_black.png' alt="Profile" width="75" height="75" className="image"/>
                <div className="navbar__toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <NBLink linkText = 'Welcome' visible = {linkView}/>
                    </li>
                    <li className="navbar__item">
                        <NBLink linkText = 'About Us' visible = {linkView}/>
                    </li>
                    <li className="navbar__item">
                        <NBLink linkText = 'Companies' visible = {linkView}/>
                    </li>
                    {displayUserActions &&
                        <div className="user__actions">

                            <li>
                                <NBButton buttonText = 'Log In' buttonLink = '/pages/login' purpose='redirect'/>
                            </li>
                            <li>
                                <NBButton buttonText = 'Sign Up' buttonLink = '/pages/signup' purpose='redirect'/>
                            </li>
                        </div>

                    }

                    {authenticated && 
                        <div className="user__actions">
                            <li>
                            <NBButton buttonText = 'Log Out' buttonLink = '' purpose='logout'/>
                            </li>
                            <li>
                            <NBButton buttonText = 'My Profile' buttonLink = '/pages/myprofile' purpose='redirect'/>
                            </li>
                        </div>

                    }


                </ul>
            </div>
        </nav>

      );
}
 
export default Navbar;