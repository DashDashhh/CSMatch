'use client'
import Navbar from "../../(site)/components/navbar";
import Footer from "../../(site)/components/footer";

import './home.css'
import '../../(site)/components/navbar.css'

const Home = () => {
    const astralLeft = "<"
    const astralRight = ">"
    return (
        <div>
        <Navbar linkView = 'true' buttonView = 'true'/>
        <div className="hero" id="hero">
            <div className="hero__container">
                <h1 className="hero__heading">{astralLeft}CS<span>Match</span>/{astralRight}</h1>
                <p className="hero__description">Connecting Future Computer Scientists with Employers!</p>
                <button className="main__btn"><a href="/pages/signup">Sign Up</a></button>
            </div>
        </div>


        <div className="main" id="about">
            <div className="main__container">
                <div className="main__img--container">
                    <div className="main__img--card"><i className="fas fa-layer-group"></i></div>
                </div>
                <div className="main__content">
                    <h1>What do we do?</h1>
                    <h2>Connect students with employers!</h2>
                    <p>Students in DCPS currently have very limited options regarding computer science classes that they can enroll in. Our website helps target this issue, giving students an opportunity to advertise themselves as potential interns.</p>
                    <button className="main__btn"><a href="pages/internlist">See Our Interns</a></button>
                </div>
            </div>
        </div>

        <div className="interns" id="interns">
            <h1>Featured Businesses</h1>
            <div className="interns__wrapper">
                <div className="interns__card">
                    <h2>The DC Department of Public Works</h2>
                    <div className="interns__btn"><button>Explore</button></div>
                </div>
                
            </div>
        </div>


        <div className="main" id="signin">
            <div className="main__container">
                <div className="main__content">
                    <h1>Get Involved</h1>
                    <h2>Sign Up Today!</h2>
                    <p>You can create a listing for yourself as an intern today. Allow businesses to contact you through this website and you&aposll be on your way to a career in computer science!</p>
                    <button className="main__btn"><a href="/pages/signup">Sign Up</a></button>
                </div>
                <div className="main__img--container">
                    <div className="main__img--card"><i className="fas fa-users"></i></div>
                </div>
                
            </div>
            </div>
        <Footer />
    </div>
    );
}
 
export default Home;