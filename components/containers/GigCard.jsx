import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import Image from 'next/image'
import {BlockchainContext} from "../../context/BlockchainContext.tsx";
import ChatWindow from '../chat/index'
import Filter from "../others/Filter";

export default function GigCard({gigId}) {
    console.log(gigId,"gigiIS");
    const [gig, setGig] = useState({});
    const [toggle,setToggle] = useState(false)
    const [ownerName,setOwnerName] = useState("...");

    const {data} =
      useContext(BlockchainContext);

    const [otherPerson,setOtherPerson] = useState();

    useEffect(() => {
        axios.get(`/api/gig/fetch?objectId="${gigId}"`).then(res => {
            setGig(res.data[0]);
            axios.get(`/api/profile/fetch?objectId="${res.data[0].issuedBy}"`).then(res => {
                setOwnerName(res.data[0].name);

            })
        })
    }, [gigId]);

    const isOwner = gig?.issuedBy===data?.user?.id;

    if(!gig )
        return <div> Please Wait....</div>;
    return (
        <div className="flex relative z-2 justify-between px-10 py-12 h-[36rem] w-[60rem] bg-[#ffffff]  border-4 rounded-[5px] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">

            <div className="flex flex-col justify-around font-mada font-medium text-[3rem]  ">
                <div className="flex flex-col h-[60%]">
                    <h2 className="mx-2 mb-1 mt-10 text-[2rem] font-mada font-[700] text-main">{gig.title}</h2>
                    <h2 type="text" className="mx-2  text-textSecondary  text-[1.25rem] font-[600] h-[60%]">{gig.description}</h2>   
                </div>

                <div className="flex flex-col">
                    <div className="flex  items-center  text-[4rem]">
                        <Image src={'/vectors/cash.svg'}
                            width="60"
                            alt={"image"}

                            height="50"/>
                        <h2 type="text"
                            className="h-[3rem] mx-5  text-secondary text-[2rem]">RTN {gig.bounty}</h2>
                    </div>
                    <div className="flex  items-center text-[4rem]">
                        <Image src={'/vectors/time.png'}
                            alt={"image"}
                            width="60"
                            height="60"/>

                        <h2 type="text"
                            className="h-[3rem] mx-5  text-main text-[2rem]">{gig.time}</h2>
                    </div>

                    <span className='font-mada text-textSecondary text-[1rem] mt-10'>
                Requested By
                        {/* <span> {Profile.name} </span> */}
                        <span className='text-main'> {!isOwner ? ownerName : "you"} </span>
                    </span>

                    <span className='font-mada text-textSecondary text-[1rem]'>
                        Category:<span className='text-secondary'>{gig.category} </span>
                    </span>

                    <div className='flex items-center justify-start '>
                        <div className='cursor-pointer'
                            onClick={()=>setToggle(preVal=>!preVal&&data.isLoggedIn)}>
                            {
                                toggle?
                                    <Image src="/vectors/chat.svg"
                                        height={30}
                                        alt="dff"
                                        width={30}/>:
                                    <Image src="/vectors/chatActive.svg"
                                        height={30}
                                        alt="dff"
                                        width={30}/>
                            }
                        </div>
                        <div className='ml-2 cursor-pointer'
                            onClick={()=>setToggle(preVal=>!preVal&&data.isLoggedIn)}>
                            {!toggle?<Image src="/vectors/agreement.svg"
                                height={30}
                                alt={"init"}
                                width={30}/>:
                                <Image src="/vectors/agreementActive.svg"
                                    height={30}
                                    alt={"init"}
                                    width={30}/>}
                        </div>
                    </div>
                </div>
            </div>

            <ChatWindow
                isUserLoggedIn={data.isLoggedIn}
                details={gig}
                user={data.user}
                isOwner={isOwner}
                gigId={gigId}
                isPosted
                modeToggle={toggle}
                otherPerson={otherPerson}
                setOtherPerson={setOtherPerson}
            />

        </div>
    )
}
