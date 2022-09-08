import axios from "axios";
import {useRouter} from "next/router";
import React, {useState, useEffect, useContext} from "react";
import Image from 'next/image'
import ChatWindow from '../chat'
import Button from '../Button'
import {BlockchainContext} from "../../context/BlockchainContext.tsx";
import CategoryButton from '../CategoryButton'


function NewProjectCard() {
    const {data, setData} = useContext(BlockchainContext);
    const [categories,setCategories] = useState('');
    const [details,setDetails] = useState({title:'',description:'',bounty:'',time:''});
    const {title,description,bounty,time} = details;

    const {push} = useRouter();

    const postGigHandler = () => {
        axios.post("/api/gig/create", {
            title,
            description,
            bounty,
            time,
            issuedBy: data.user.id,
            category: categories,
        }).then((res) => {
            push(`/gig/view/${res.data.id}`)
        })
    }

    console.log(data, 'data');
    console.log(details, 'details');
    useEffect(() => {
        if (data.newProject !== undefined && details.title === '' &&
            details.description === '' && details.bounty === '' && details.time === '') {
            const {newProject, ...newData} = data;
            console.log(newProject, "newProject");
            setDetails(newProject);
            setData(newData);
        }
    // Intentionally suppress the warning about missing dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setData, ])

    return (
        <div className="flex relative z-2 justify-between px-10 py-12 h-[36rem] w-[60rem] bg-[#ffffff]  border-4 rounded-[5px] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col justify-around font-mada font-medium text-[3rem]  ">
                <div className="flex flex-col h-[60%]">
                    <input type="text"
                        className="border-2 rounded-md px-2 mb-1 mt-10 text-[2rem] font-mada font-[700] text-main"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>setDetails({...details, title: e.target.value})}>

                    </input>
                    <textarea
                        className="border-2 rounded-md px-2 border-textSecondary text-textSecondary  text-[1.25rem] font-[600] h-[60%]"
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>setDetails({...details, description: e.target.value})}>

                    </textarea>
                </div>

                <div className="flex flex-col">
                    <div className="flex  items-center  text-[1.5rem] text-secondary font-mada font-[600] justify-between">
                        <Image src={'/vectors/cash.svg'}
                            width="60"
                            alt="df"
                            height="50"/>
                        RTN
                        <input type="text"
                            className="border-2 h-[3rem] rounded-md px-2 border-secondary text-secondary text-[1.2rem]"
                            placeholder="Bounty"
                            value={bounty}
                            onChange={(e)=>setDetails({...details, bounty: e.target.value})}></input>
                    </div>
                    <div className="flex  items-center text-[1.5rem] text-main font-mada font-[600] justify-between">
                        <Image src={'/vectors/time.svg'}
                            alt="df"
                            width="60"
                            height="60"/>
                        Mths
                        <input type="text"
                            className="border-2 h-[3rem] rounded-md px-2 border-main text-main text-[1.2rem]"
                            placeholder="Time"
                            value={time}
                            onChange={(e)=>setDetails({...details, time: e.target.value})}></input>
                    </div>
                    <div className='flex w-[100%] mt-5 text-[1rem] items-center'>
                        <Button Content={'Post Gig'} onClick={postGigHandler}/>
                        <CategoryButton categories={categories} setCategories={setCategories}/>
                    </div>
                </div>
            </div>

            <ChatWindow
                isUserLoggedIn={data.isLoggedIn}
                details={details}
                user={data.user}
                isPosted={false}
                isOwner
            />
        </div>
    )
}



export default NewProjectCard;
