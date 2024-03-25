'use client'
import Navbar from "@/app/(site)/components/navbar";
import Footer from "@/app/(site)/components/footer";

import './home.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import {useRouter} from "next/navigation";

const Home = () => {


    // const toList = (loc) => {
    //     window.location.href=`/pages/${loc}`
    // }
    return (
        <div>
        <Navbar linkView = 'true' buttonView = 'true'/>
        <div className="hero" id="hero">
            <div className="hero__container">
                <h1 className="hero__heading">CS<span>Match</span></h1>
                <p className="hero__description">Connecting Future Computer Scientists with Employers!</p>
                <button className="main__btn" onClick={() => window.location.href='/pages/signup'}>Sign Up!</button>
            </div>
        </div>


        <div className="main" id="about">
            <div className="main__container">
                <div className="main__img--container">
                    {/* <div className="main__img--card"><i className="fas fa-layer-group"></i></div> */}
                    <img className="main__img--card" src="https://www.shutterstock.com/image-photo/learning-hispanic-computer-science-student-600nw-1748265719.jpg" alt="image"></img>
                </div>
                <div className="main__content">
                    <h1>What do we do?</h1>
                    <h2>Connect students with employers!</h2>
                    <p>Students in DCPS currently have very limited options regarding computer science classes that they can enroll in. Our website helps target this issue, giving students an opportunity to advertise themselves as potential interns.</p>
                    <button className="main__btn" onClick={() => window.location.href='/pages/internlist'}>See Our Interns</button>
                </div>
            </div>
        </div>

        <div className="interns" id="interns">
            <h1>Featured Businesses</h1>
            <div className="interns__wrapper">
                <div className="interns__card">
                    <h2>The DC Department of Public Works</h2>
                    <div className="interns__btn"><button onClick={() => window.location.href='https://dpw.dc.gov/'}>Explore</button></div>
                </div>
                
            </div>
        </div>


        <div className="main" id="signin">
            <div className="main__container">
                <div className="main__content">
                    <h1>Get Involved</h1>
                    <h2>Sign Up Today!</h2>
                    <p>You can create a listing for yourself as an intern today. Allow businesses to contact you through this website and you&aposll be on your way to a career in computer science!</p>
                    <button className="main__btn" onClick={() => window.location.href='/pages/signup'}>Sign Up</button>
                </div>
                <div className="main__img--container">
                    <img className="main__img--card" src="https://st.depositphotos.com/1075946/1393/i/450/depositphotos_13933050-stock-photo-students-with-teacher-in-front.jpg" alt="image"></img>

                </div>
                
            </div>
            </div>
        <Footer />
    </div>
    );
}
 
export default Home;