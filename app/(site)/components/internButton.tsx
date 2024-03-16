import { useRouter } from "next/navigation";

const InternButton = (props: {userId: String}) => {
    const {userId} = props

    const path = `/pages/internlist/bio/${userId}`
    const router = useRouter()


    return (
        <div className="interns__btn"><button><a href={path}>See More</a></button></div>
    );
}
 
export default InternButton;