
import './footer.css'
import Image from 'next/image';

import {AiFillGithub, AiFillTwitterCircle} from "react-icons/ai"
import {AiFillFacebook} from "react-icons/ai"
import {AiFillYoutube} from "react-icons/ai"
import {AiFillInstagram} from "react-icons/ai"

const Footer = () => {
    return ( 
        // <!-- Footer Section -->
        <div className="footer__container">
            <div className="footer__links">
              <div className="footer__link--wrapper">
                <div className="footer__link--items">
                  <h2>Contact Us</h2>
                  <a href="https://www.instagram.com/csmatch_official/">Contact</a> <a href="https://www.facebook.com/profile.php?id=61557863874293">Support</a>
                  <a href="/">Destinations</a>
                </div>
              </div>
              <div className="footer__link--wrapper">
                <div className="footer__link--items">
                  <h2>Social Media</h2>
                  <a href="https://www.instagram.com/csmatch_official/">Instagram</a> <a href="https://www.facebook.com/profile.php?id=61557863874293">Facebook</a>
                  <a href="https://www.youtube.com/channel/UCCH1wDrhpBpdErtefNC9hbA">Youtube</a> <a href="https://twitter.com/csmatchofficial">Twitter</a>
                </div>
              </div>
            </div>
            <section className="social__media">
              <div className="social__media--wrap">
                <div className="footer__logo">
                  <Image src='/logo_white.png' alt="Profile" width="75" height="75" className="image"/>
                </div>
                <p className="website__rights">© CSMatch 2024. All rights reserved</p>
                <div className="social__icons">
                  <a href="https://www.facebook.com/profile.php?id=61557863874293" className="social__icon--link" target="_blank"
                    ><AiFillFacebook/></a>
                  <a href="https://www.instagram.com/csmatch_official/" className="social__icon--link"
                    ><AiFillInstagram/></a>
                  <a href="https://www.youtube.com/channel/UCCH1wDrhpBpdErtefNC9hbA" className="social__icon--link"
                    ><AiFillYoutube/></a>
                  <a href="https://twitter.com/csmatchofficial" className="social__icon--link"><AiFillTwitterCircle/></a>
                  <a href="https://github.com/DashDashhh/CSMatch" className="social__icon--link"><AiFillGithub/></a>
                </div>
              </div>
            </section>
          </div>   
    );
}
 
export default Footer;