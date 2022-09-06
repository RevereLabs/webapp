import React,{useState} from 'react'

function Terms({json, setJSON}) {

    const onClickHandler = (key,value) => {
        console.log(key,value);
        setJSON(prevState => ({
            ...prevState,
            [key]:value
        }));
    }
   
    return (
        <div className=" h-[100%] flex flex-col justify-around">
            <div className="w-[100%] flex justify-between">
                <p>Client’s Bounty</p>
                <input value={json?.clientsBounty}
                    onChange={e => onClickHandler('clientsBounty',e.target.value)}
                    placeholder="$0"
                    type="number"
                    className="border-2 rounded-md" />
            </div>
            <div className="w-[100%] flex justify-between">
                <p>Freelancer’s Stake</p>
                <input value={json?.freelancerStake}
                    onChange={e => onClickHandler('freelancerStake',e.target.value)}
                    placeholder="$0"
                    type="number"

                    className="border-2 rounded-md"/>
            </div>
            <div className="w-[100%] flex justify-between">
                <p>Client Cancel fees</p>
                <input
                    value={json?.clientCancellationFees}
                    onChange={e => onClickHandler('clientCancellationFees',e.target.value)}
                    className="border-2 rounded-md"
                    type="number"
                    placeholder="$10000"/>
            </div>
        </div>
    )
}

export default Terms