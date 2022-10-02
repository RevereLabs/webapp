
import axios from "axios";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import React, {useContext, useState, useEffect} from "react";
import Image from 'next/image'
import {BlockchainContext} from "../../context/BlockchainContext.tsx";
import {approveAndTransfer, getProjectState} from "../../contracts";
import AgreementPortal from "../AgreementPortal";
import Chat from "../../pages/demo/chat";
import Button from "../Button";
import ContractPortal from "../ContractPortal";
export default function FreelancerChatWindow({isUserLoggedIn=false,details,modeToggle,}) {
    console.log(details,"details")
    const [people,setPeople] = useState(null);
    const [peopleDets,setPeopleDets] = useState([]);
    const {data, setData, connectWallet, getProvider} = useContext(BlockchainContext);
    const [application, setApplication] = useState(undefined);
    const [button, setButton] = useState({
        text: "Loading...",
        disabled: true,
        onClick: ()=>{
            console.log("sd");
        }
    });
    const {push} = useRouter();
    const [json, setJSON] = useState(
        {
            clientsBounty: 0,
            freelancerStake: 0,
            clientCancellationFees: 0,
            checkpoints: [],
        }
    );


    // useEffect(()=>{
    //     console.log("finals get calll")
    //     axios.get(
    //         `/api/gig-application/fetch`,

    //     ).then((res) =>{
    //         console.log("finals get",res)}
    //     )
    // },[])

    console.log("details are", details, data.user);

    const onclickHandlerFreeLancer = async () => {
        await axios.post("/api/gig-application/create", {
            gigId: details.objectId,
            me: data.user.id,
        });
        axios.get(`/api/gig-application/fetch?gigId="${details.objectId}"&applicantId="${data?.user?.id}"`).then((res) => {
            setApplication(res.data[0]);
        }
        )
    };

    useEffect(() => {
        if (details?.objectId && data?.user?.id)
            axios.get(`/api/gig-application/fetch?gigId="${details.objectId}"&applicantId="${data?.user?.id}"`).then((res) => {
                setApplication(res.data[0]);
            }
            )
    }, [data, details])

    console.log("application is here", application?.formalJson)

    useEffect(() => {
        if (!people)
            return;
        const ss = async () => {let q= [];
            for ( let i = 0; i<people?.length;i++){
                const res = await axios.get(`/api/profile/fetch?objectId="${people[i]?.applicantId}"`);//.then((res) => {
                q=[...q, res.data[0]];
                q[q.length-1].rocketChatId = people[i].rocketChatChannelId;
            }
            setPeopleDets(q);
        };
        ss();
    },[people])


    console.log(people,peopleDets," are people");

    useEffect(() => {
        if (!application || !application.status)
            return;
        if (application.status === "pending" || application.status === "informal")
            setButton({
                text: "Applied. Please wait for client to deploy contract.",
                disabled: true,
                onClick: ()=>null,
            });
        else if (application.status === "contract_initialized")
            setButton({
                text: "Applied. Please wait for client to mint RNFT for this gig and deploy contract.",
                disabled: true,
                onClick: ()=>null,
            });
        else if (application.status === "contract") {
            const getProjectStateFromContract = async () =>{
                let x  = await getProvider();
                if(!x){
                    await connectWallet();
                    x = await getProvider();
                }
                let value = await getProjectState(x, application.contractId);
                console.log(value,"projectstate")
                return value;
            }
            getProjectStateFromContract().then((projectState) => {
                if (projectState === 0)
                    setButton({
                        text: "Contract deployed. Please wait for client to transfer RNFT to smart contract.",
                        disabled: true,
                        onClick: ()=>null,
                    })
                else if (projectState === 1)
                    setButton({
                        text: "Contract deployed. Please wait for client to transfer funds to smart contract.",
                        disabled: true,
                        onClick: ()=>null,
                    })
                else if (projectState === 2)
                    setButton({
                        text: "Deposit stake funds",
                        disabled: false,
                        onClick: async ()=>{
                            console.log(application," others");
                            let x  = await getProvider();
                            if(!x){
                                await connectWallet();
                                x = await getProvider();
                            }
                            console.log(x, "pushing x");
                            const deploying = approveAndTransfer(x,application.contractId,
                                "freelancer", ethers.utils.parseUnits(application?.formalJson.freelancerStake,
                                    18));
                            console.log(deploying);
                        },
                    })
                else if (projectState === 3)
                    setButton({
                        text: "Checkpointing started. Please goto contract portal to check progress.",
                        disabled: true,
                        onClick: ()=>null,
                    })
                else if (projectState === 5)
                    setButton({
                        text: "Gig complete",
                        disabled: true,
                        onClick: ()=>null,
                    })

            });
        }
    }, [application])
    console.log(application, "is app id")



    return (
        <div className="relative z-10">
            {!isUserLoggedIn&&<div className="absolute left-2 top-2 backdrop-blur-sm w-[95%] h-[90%] z-20 flex flex-col justify-center items-center pt-10">
                <h2 className="text-textMain text-[1.5rem] font-[600] font-mada my-5">You need to login to proceed</h2>
                <Button
                    Content="Login"
                    onClick={() => {
                        setData({...data, newProject: details, next: window.location.href});
                        push('/auth');
                    }
                    }
                />
            </div>}
            {(application===undefined)&&(
                <div className="bg-accent relative h-[30rem] w-[22rem] md:w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col items-center justify-center">
                    <Image src={'/vectors/chat.svg'}
                        height={100}
                        alt={"df"}
                        width={100}/>
                    <h2 className="mb-10 font-mada text-center font-[600] text-textSecondary mt-5">To initiate the informal negotiation press Start and a notification will be sent to the creator of this gig</h2>
                    <Button Content="Start"
                        Color="#008A61"
                        onClick={onclickHandlerFreeLancer}/>
                </div>)
            }
            {(application!==undefined)&&(!modeToggle?(
                <div className="bg-accent relative h-[30rem] w-[22rem] md:w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col items-center justify-center">
                    <Chat userToken={data?.user?.rocketChatToken}
                        otherUserToken={application.rocketChatChannelName}/>
                </div>):(application.status!=="contract"?<ContractPortal objectId={application.objectId}
                mainJSON={application.formalJson}/>:(
                <AgreementPortal
                    checkpointList={application.formalJson.checkpoints}
                    entity={'freelancer'}
                    escrowAddress={application.contractId}
                />))
            )}
            {(application!==undefined)?<button
                onClick={button.onClick}
                disabled={button.disabled}>
                {button.text}
            </button>:null}

        </div>
    )
}

