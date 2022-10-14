/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import ProjectCard from '../components/ProjectCard'
import LinkCarousel from '../components/LinkCarousel'
import styles from '../styles/Home.module.css'
import {
    BlockchainContext,
} from "../context/BlockchainContext.tsx";
import axios from "axios"

function Profile({Profile}) {
    const {data} =
    useContext(BlockchainContext);
    const [ gigs , setGigs] = useState([]);
    const[userLinks,setUserLinks] = useState([]);
    
    Profile={
        name:data?.user?.name,
        email: data?.user?.email,
        profilePicture:data?.user?.profilePic,
        projects: [{"title":"TestGig2", "description":"Need to Design a website", "bounty":"USD400", "time":"2 months", "completed":false,  "category": "Design"},{"title":"TestGig2", "description":"Need to Design a website", "bounty":"USD400", "time":"2 months", "completed":false,  "category": "Design"},{"title":"TestGig2", "description":"Need to Design a website", "bounty":"USD400", "time":"2 months", "completed":false,  "category": "Design"}],
        work:[{"title":"TestGig2", "description":"Need to Design a website", "bounty":"USD400", "time":"2 months", "completed":false,  "category": "Design"},],
        link:[],
        Daos:[
            {title:'odysseydao',color:'#CBA3FF'},
            {title:'StatesDao',color:'#88BBEB'}
        ],

    }

    useEffect(() => {
        axios.get(
            "/api/profile"
        ).then((res) => {
            console.log(res.data," is answer");
        }).catch((error) => {
            console.log("error", error);
        })

        axios.get(`/api/gig/fetch?issuedBy="${data?.user?.id}"`).then((res) => {
            console.log("sharam aagyi 2 toh", res.data.length,res.data)
            setGigs(res.data);

        }
        )

    }, [data?.user?.id] )

    return (
        <div className={styles.container}>
            <div className="fixed z-0 top-[5vh] left-0"><Image src="/background/bg3.svg"
                alt={"s"}
                height="600"
                width="400" /></div>
            <div className="fixed z-0 top-[5vh] right-[-5rem]"><Image src="/background/bg4.svg"
                height="700"
                alt={"s"}
                width="500" /></div>
            <div className="fixed z-0 bottom-[-1rem] left-[25%]"><Image src="/background/bg5.svg"
                alt={"s"}
                height="200"
                width="700" /></div>

            <div className="relative z-2 w-[100%] flex flex-col items-center text-center">
                <a className="drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] flex justify-center">
                    <img src={data?.user?.profilePic}
                        alt={"s"}
                        className='h-[30%] w-[30%] rounded-full'/>
                </a>

                <h2 className="text-main font-mada font-[700] text-[5rem]">{data?.user?.name}</h2>

                <div className='flex text-textMain font-mada font-[500]'>
                    <span className="mx-2">
                        <span className="text-secondary">{Profile.work.length}</span> Gigs Done
                    </span>
                    <span className="mx-2">
                        <span className="text-[red]">{Profile.projects.length}</span> Gigs Provided
                    </span>
                </div>

                <div className='flex'>
                    {Profile.Daos.map((dao,i)=>(
                        <div className="w-[90%] h-[20%] mx-2 rounded-md my-2 px-2 flex justify-between items-center cursor-pointer "
                            style={{backgroundColor:dao.color,color:"#FFFFFF"}}
                            key={i}>
                            <h2>{dao.title}</h2>
                        </div>
                    ))}
                </div>

                <LinkCarousel userLinks={userLinks}
                    setUserLinks={setUserLinks} />
            </div>


            <h2 className="text-main font-mada font-[700] text-[2.5rem] mx-10 relative z-1">My Taken Work</h2>
            <div className='flex flex-wrap w-[100%] justify-items-center'>
                {gigs.map((project, i) =>(
                    project.issuedBy !== data?.user?.id &&
                <ProjectCard isGigActive={!project.completed}
                    jobTitle={project.title}
                    amount={project.bounty}
                    descp={project.description}
                    key={i}/>  ))}
            </div>

            <h2 className="text-main font-mada font-[700] text-[2.5rem] mx-10 relative z-1">My Given Projects</h2>
            <div className='flex flex-wrap w-[100%] justify-items-center'>
                {gigs.map((project, i) =>(
                    project.issuedBy === data?.user?.id &&   <ProjectCard
                        project={project}
                        isGigActive={!project.completed}
                        jobTitle={project.title}
                        amount={project.bounty}
                        descp={project.description}
                        key={i}/>

                ))}
            </div>

        </div>
    )
}

// export async function getServerSideProps(){
//     //code to fetch data
// }

export default Profile
