'use client'

import './internsearch.css';
import Navbar from "@/app/(site)/components/navbar";
import InternCard from "@/app/(site)/components/interncard";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


async function getData() {
    const res = await fetch(`${process.env.ROOT_VAR}/api/cards`, {cache: "no-store"});
    if(!res.ok) console.log('error');
    return res.json();
}

const internList = async() => {

    // ref()

    const data = await getData();

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
 
export default internList;