
import './internbio.css'
import '@/app/(site)/components/navbar.css'
import '@/app/(site)/components/footer.css'

import Footer from '@/app/(site)/components/footer';

import Navbar from "@/app/(site)/components/navbar";

import Image from 'next/image';



async function getData(request: string) {
    const query = encodeURI(`?id=${request}`)
    try {
        // Make sure to use cache no store!
        // Check this URL
        const response = await fetch(`${process.env.VERCEL_URL}/api/singleUser/slug${query}`, {cache: "no-store"});
        const res = await response.json()
        return (res)

    } catch(error) {
        console.log(error)
    }

}

const InternBio = async({ params }: any) => {
    const slug = params.slug
    const bio = await getData(slug)

    console.log(`bio: ${JSON.stringify(bio)}`)

    return (
        <div>
            {/* <!-- Navbar selection-->
            <!--All classNamees have two underscores--> */}
            <Navbar linkView = 'false' buttonView = 'true'/>
            <div className="profile__wrapper">
                <div className="bar1">
                    <Image src={bio.pfpUrl} alt="Profile" width="100" height="100" className="image"/>
                    <a id="resume__download" href={bio.resumeUrl}>Download My Resume Here!</a>

                    <div className="button__wrapper">
                    </div>

                    <div className="information">
                    <ul className="basic__information">
                        <h1>Basic Information</h1>
                        <li>
                        <p>Name: {bio.internName}</p>
                        </li>
                        <li>
                        <p>Grade: {bio.grade}</p>
                        </li>
                        <li>
                        <p>Looking for experience in: {bio.experience}</p>
                        </li>
                    </ul>  
                    <ul className="contact__information">
                        <h1>Contact Information</h1>
                        <li>
                        <p>Email: {bio.email}</p>
                        </li>
                        <li>
                        <p>Phone Number: {bio.phoneNumber}</p>
                        </li>
                        <li>
                        <p>Other Socials: {bio.socials}</p>

                        </li>
                    </ul>
                    </div>
                </div>
                <div className="description">
                    <h1>About me</h1>
                    <div id="description__paragraph">{bio.description}</div>
                </div>


                


            </div>

            <Footer/>

            

        </div>
    );
}
 
export default InternBio;