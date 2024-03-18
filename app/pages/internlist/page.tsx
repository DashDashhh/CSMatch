import './internsearch.css';
import Navbar from "@/app/(site)/components/navbar";
import InternCard from "@/app/(site)/components/interncard";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { getServerSideProps } from 'next/dist/build/templates/pages';


async function getData() {
    const res = await fetch("/api/cards", {cache: "no-store"});
    if(!res.ok) console.log('error');
    return res.json();
}

// API GET DATA FROM MONGO

// import {NextResponse} from "next/server";


// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function GET() {
//     try {
//         const cards = await prisma.userCardInfo.findMany();
//         return new NextResponse(JSON.stringify(cards))
//     } catch(error) {
//         return new NextResponse('error')
//     }

// }


// async function getData() {
//     const res = await GET()
//     return res.json();
// }

const internList = async({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    // const data = await getData();

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

export async function GetServerSideProps(context: any) {
    const data = await getData();
    return {
        props: {
            results: data
        }
    }

}
 
export default internList;