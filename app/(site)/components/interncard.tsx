import InternButton from '../components/internButton'

import Image from 'next/image';

const InternCard = (props: {internName: String, internGrade: String, internEmail: String, userId: String, pfpUrl: string}) => {

    const {internName, internGrade, internEmail, userId, pfpUrl} = props

    return (


        <div className="interns__card">
            <div className="profile__picture">
                <Image src={pfpUrl} alt="Profile" width="100" height="100"/>

            </div>
            <p>Name: {internName}</p>
            <p>Grade: {internGrade}</p>
            <p>Email: {internEmail}</p>
            <InternButton userId={userId}/>
        </div>
    );
}
 
export default InternCard;