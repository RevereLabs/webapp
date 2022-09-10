
import axios from "axios";
import {useRouter} from "next/router";
import React, {useContext, useState, useEffect} from "react";
import Image from 'next/image'
import {BlockchainContext} from "../../context/BlockchainContext.tsx";
import AgreementPortal from "../AgreementPortal";
import Button from '../Button';
import Chat from "../../pages/demo/chat";
import ContractPortal from "../ContractPortal";
import {
    deployContract,
    mintAndApprove,
    transferRNFTToEscrow,
    getProjectState,
    approveAndTransfer
} from "../../contracts/index";
import { ethers } from "ethers";
import { create_ipfs_for_gig } from "../../utils/filecoin";
export default function ClientChatWindow({isUserLoggedIn=false,details,isPosted, modeToggle, gig}) {

    const [people,setPeople] = useState([]);
    const [otherPerson, setOtherPerson] =useState(-1);
    const [peopleDets,setPeopleDets] = useState([]);
    const {data, setData, connectWallet,getProvider} = useContext(BlockchainContext);
    const {push} = useRouter();
    const [button, setButton] = useState({
        text: "Loading...",
        disabled: true,
        onClick: ()=>null
    });

    console.log("details are", details, data.user, people, people[otherPerson]?.rocketChatChannelName);

    useEffect(() => {
        axios.get(`/api/gig-application/fetch?gigId="${details.objectId}"`).then((res) => {
            console.log("sharam aagyi toh", res.data.length,res.data)
            setPeople(res.data);
        }
        )

    }, [details, ])

    console.log(otherPerson,"is otherperson")

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

    useEffect(() => {
        if (otherPerson===-1)
            return;
        const application = {status: people[otherPerson]?.status};
        if (application.status === "pending" || application.status === "informal")
            setButton({
                text: "Deploy Contract",
                disabled: false,
                onClick: async ()=>{

                    const findCumulativeSum = arr => {
                        const creds = arr.reduce((acc, val) => {
                            let { sum, res } = acc;
                            sum += val;
                            res.push(sum);
                            return { sum, res };
                        }, {
                            sum: 0,
                            res: []
                        });
                        return creds.res;
                    };
                    console.log(people[otherPerson].formalJson.checkpoints," persondta")
                    const checkpointsValue = findCumulativeSum([0].concat(...(people[otherPerson].formalJson.checkpoints.map(x => parseInt(x.bounty,10)))))


                    console.log(checkpointsValue," findCumulativeSum(arr)");
                    let x  = await getProvider();
                    console.log(x, "is proivdr");
                    if(!x){
                        await connectWallet();
                        console.log(await getProvider());
                    }
                    console.log(x," poiu", people[otherPerson]);
                    const deploying = await deployContract(
                        x,
                        checkpointsValue,
                        peopleDets[otherPerson].address,
                        ethers.utils.parseUnits(people[otherPerson]?.formalJson.clientsBounty,18),
                        ethers.utils.parseUnits(people[otherPerson]?.formalJson.freelancerStake,18),
                        people[otherPerson]?.formalJson.clientCancellationFees,
                    ).then((res) =>{
                        console.log(res," is deploying res");
                        axios.post(
                            `/api/gig-application/update`,
                            {
                                objectId: people[otherPerson].objectId,
                                contractId: res.address,
                                status: "contract_initialized"
                            }
                        ).then( (resp) =>
                        {
                            console.log(resp," resp");
                            location.reload();
                        }
                        )
                    });
                },
            });
        else if (application.status === "contract_initialized")
            setButton({
                text: "Mint RNFT",
                disabled: false,
                onClick: async ()=>{
                    let x  = await getProvider();
                    if(!x){
                        await connectWallet();
                        x = await getProvider();
                    }
                    let m = await create_ipfs_for_gig(details,"https://i.imgur.com/G3MxYHf.png");
                    console.log(x,m," poiu", people[otherPerson]);
                    const minting = await mintAndApprove(
                        x,
                        people[otherPerson].contractId,
                        m
                    ).then((res) =>{
                        console.log(res," is deploying res");
                        axios.post(
                            `/api/gig-application/update`,
                            {
                                objectId: people[otherPerson].objectId,
                                status: "contract",
                                RNFTAddress: res,
                            }
                        ).then( (resp) =>
                        {
                            console.log(resp," resp");
                            location.reload();
                        }
                        )
                    });
                },
            })
        else if (application.status === "contract") {
            const getProjectStateFromContract = async () =>{
                let x  = await getProvider();
                if(!x){
                    await connectWallet();
                    x = await getProvider();
                }
                let value = await getProjectState(x, people[otherPerson].contractId);
                console.log(value,"projectstate")
                return value;
            }
            getProjectStateFromContract().then((projectState) => {
                if (projectState === 0)
                    setButton({
                        text: "Transfer RNFT to smart contract.",
                        disabled: false,
                        onClick: async ()=>{
                            console.log(people[otherPerson]," others");
                            let x  = await getProvider();
                            if(!x){
                                await connectWallet();
                                x = await getProvider();
                            }
                            console.log(x, "pushing x");
                            const deploying = transferRNFTToEscrow(x,people[otherPerson].contractId,people[otherPerson].RNFTAddress);
                            console.log(deploying);
                        },
                    })
                else if (projectState === 1)
                    setButton({
                        text: "Transfer funds to smart contract.",
                        disabled: false,
                        onClick: async ()=>{
                            console.log(people[otherPerson]," others");
                            let x  = await getProvider();
                            if(!x){
                                await connectWallet();
                                x = await getProvider();
                            }
                            console.log(x, "pushing x");
                            const deploying = approveAndTransfer(x,people[otherPerson].contractId,
                                "client", ethers.utils.parseUnits(people[otherPerson]?.formalJson.clientsBounty,
                                    18));
                            console.log(deploying);
                        },
                    })
                else if (projectState === 2)
                    setButton({
                        text: "Please wait for freelancer to deposit stake funds",
                        disabled: true,
                        onClick: ()=>null,
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
    }, [otherPerson, people])


    console.log(people,peopleDets," are people");
    console.log(JSON.stringify(otherPerson),"otherPerson");
    if (!isPosted) {
        return (
            <div className="relative z-10">
                <div className="bg-accent relative h-[30rem] w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-textMain text-[1.5rem] font-[600] font-mada my-5">You need to post gig to proceed</h2>
                </div>
            </div>
        )

    }
    return (
        <div className="relative z-10">
            {people?.length===0&&<div className="bg-accent relative h-[30rem] w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col items-center justify-center">
                <Image src={'/vectors/chat.png'}
                    height={100}
                    alt={"df"}
                    width={100}/>
                <h2 className="font-mada text-center font-[600] text-textSecondary mt-5">Your gig is being is shown to all freelancers. Interested people will appear here soon</h2>
            </div>}

            {people?.length!==0&&
                <div>
                    <select name="users"
                        id="users"
                        onChange={(e)=>{
                            console.log(e.target.value,"poi");
                            setOtherPerson(e.target.value);
                        }}>
                        <option
                            value={null}>Select</option>
                        { peopleDets?.map((person,index)=> {
                            console.log(people[index].rocketChatChannelName," poi person");
                            return(
                                <option key={index}
                                    value={index}>{person?.name}
                                </option>
                            )})}
                    </select>
                </div>
            }
            {people?.length!==0&&otherPerson!==-1&&
                <div>
                    {(!modeToggle ? (<Chat userToken={data?.user?.rocketChatToken}
                        otherUserToken={people[otherPerson].rocketChatChannelName}/>)
                        :(people[otherPerson].status!=="contract"?<ContractPortal
                            objectId={people[otherPerson]?.objectId}
                            mainJSON={people[otherPerson]?.formalJson}
                        />:<AgreementPortal
                            checkpointList={people[otherPerson].formalJson.checkpoints}
                            entity={'client'}
                            escrowAddress={people[otherPerson].contractId}
                        />))}
                    <button
                        onClick={button.onClick}
                        disabled={button.disabled}>
                        {button.text}
                    </button>
                </div>
            }
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
        </div>
    )
}

