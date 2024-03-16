import InternButton from '../components/internButton'


const InternCard = (props: {internName: String, internGrade: String, internEmail: String, userId: String}) => {

    const {internName, internGrade, internEmail, userId} = props

    return (


        <div className="interns__card">
            <div className="profile__picture"><i className="fas fa-user"></i></div>
            <p>Name: {internName}</p>
            <p>Grade: {internGrade}</p>
            <p>Email: {internEmail}</p>
            <InternButton userId={userId}/>
        </div>
    );
}
 
export default InternCard;