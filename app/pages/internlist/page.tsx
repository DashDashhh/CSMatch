import './internsearch.css';
import Navbar from "@/app/(site)/components/navbar";
import InternCard from "@/app/(site)/components/interncard";
import { unstable_noStore as noStore} from 'next/cache';
export const dynamic = 'force-dynamic'


// async function getData() {
//     const res = await fetch(`${process.env.VERCEL_URL}/api/cards`, {next: {
//         revalidate: 0
//     }});
//     if(!res.ok) console.log('error');
//     return res.json();
// }


const internList = async() => {

    const res = await fetch(`${process.env.VERCEL_URL}/api/cards`, {next: {
        revalidate: 0
    }});
    const data = await res.json()
    return (
        <div>
            <Navbar linkView="false" buttonView="true"/>
            <div className='interns'>
                <div className='interns__wrapper'>
                    {data&& data?.map((card: any) => (
                        <div key={card?.id}>
                            <InternCard internName = {card?.internName} internGrade={card?.grade} internEmail={card?.email} userId = {card?.userId}/>

                        </div>
                    ))}


                </div>

            </div>
        </div>

    );
}

// async function getServerSideProps() {
//     const res = await fetch("@/app/api/cards", {cache: "no-store"});
//     if(!res.ok) console.log('error');
//     const resJSON = await res.json();

//     return {
//         props: {
//             data: resJSON
//         }
//     }

// }


// export const getServerSideProps = (async () => {
//     // Fetch data from external API
//     const res = await fetch("/api/cards", {cache: "no-store"});
//     if(!res.ok) console.log('error');
//     const resJSON: Card = await res.json();
//     return {
//         props: {
//             results: resJSON
//         }
//     }

//   })

 
export default internList;