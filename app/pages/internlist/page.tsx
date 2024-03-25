import './internsearch.css';
import Navbar from "@/app/(site)/components/navbar";
import InternCard from "@/app/(site)/components/interncard";
export const dynamic = 'force-dynamic'




const internList = async() => {

    const res = await fetch(`${process.env.VERCEL_URL}/api/cards`, {next: {
        revalidate: 0
    }});
    console.log(res)
    const data = await res.json()
    return (
        <div>
            <Navbar linkView="false" buttonView="true"/>
            <div className='interns'>
                <div className='interns__wrapper'>
                    {data&& data?.map((card: any) => (
                        <div key={card?.id}>
                            <InternCard internName = {card?.internName} internGrade={card?.grade} internEmail={card?.email} userId = {card?.userId} pfpUrl = {card?.pfpUrl}/>

                        </div>
                    ))}


                </div>

            </div>
        </div>

    );
}

 
export default internList;