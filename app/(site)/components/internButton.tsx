'use client'
const InternButton = (props: {userId: String}) => {
    const {userId} = props

    const path = `/pages/internlist/bio/${userId}`

    const clickHandler = () => {
        window.location.href=`/pages/internlist/bio/${userId}`
    }


    return (
        <div className="interns__btn"><button onClick={clickHandler}>See More</button></div>
    );
}
 
export default InternButton;