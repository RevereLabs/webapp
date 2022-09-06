import React, {useEffect, useContext, useState} from "react";
import {disburseFunds, getCheckpointStatus, gotoNextCheckpoint} from "../contracts";
import Button from './Button'
import {BlockchainContext} from "../context/BlockchainContext.tsx";

function AgreementPortal({checkpointList, entity,  escrowAddress, objectId}) {

    console.log( checkpointList, entity,  escrowAddress," are wht I am getting");

    const [checkpointStatus, setCheckpointStatus] = React.useState(undefined);
    const {getProvider, connectWallet} = useContext(BlockchainContext);
    const [provider, setProvider] = useState(undefined);

    const validateCheckpointHandler = () => {
        gotoNextCheckpoint( provider, escrowAddress,entity).then(() => {
            location.reload();
        })
    }
    const reimburseHandler = () => {
        disburseFunds(provider, escrowAddress).then(()=>{
            if (checkpointStatus[entity] === checkpointList.length - 1) {
                // increment project state to completed

            }
        });
    }
    const currentCheck = {
        title: 'Checkpoint',
        color: '#85B9E8'
    }

    useEffect(() => {
        if(provider === undefined){
            return ;
        }
        const run = async () => {
            setCheckpointStatus(await getCheckpointStatus(provider, escrowAddress));}
        run();
    }, [escrowAddress, provider])

    useEffect(() => {
        const run = async () => {
            let x  = await getProvider();
            if(!x){
                await connectWallet();
                x = await getProvider();
            }
            setProvider(x);
        }
        run();
    }, [connectWallet, getProvider])

    if (!checkpointStatus || provider === undefined)
        return <div>Loading...</div>
    console.log(checkpointList,checkpointStatus,entity," entitiy");



    return (
        <div className="p-5 bg-accent relative h-[30rem] w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col justify-around ">
            {(checkpointList.length <= checkpointStatus[entity])?<div>All Done from your side...</div>:
                <div className="flex justify-around">
                    <div className=" rounded-md my-2 mx-10 p-6 flex justify-between items-center"
                        style={{
                            backgroundColor: currentCheck.color,
                            color: "#FFFFFF"
                        }}>{checkpointList[checkpointStatus[entity]]?.name}</div>
                    <Button Content={`Validate Checkpoint (RTN ${checkpointList[checkpointStatus[entity]]?.bounty})`}
                        onClick={validateCheckpointHandler}/>

                </div>}
            {entity==="freelancer"?(
                <div>
                    <Button Color="#008A61"
                        Content="Reimberse"
                        onClick={reimburseHandler}/>
                    <h2 className="text-textSecondary font-[600] font-mada my-5">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.</h2>
                </div>):null}
        </div>
    )
}

export default AgreementPortal
