import React, { useState } from 'react'

function Bounty({json, setJSON}) {
    const setter = (newVal,key ) => {
        let x = json;
        x.checkpoints[key]["bounty"]=newVal;
        setJSON(x);
    }
    return (
        !json?.checkpoints?.length?<h2 className=" w-[100%] text-center"> Please add checkpoints to proceed</h2>:
            <div className="w-[100%] h-[100%] flex flex-col justify-start p-2">
                {json?.checkpoints.map((item,i)=>(
                    <div className="flex items-center justify-between text-[0.75rem] mt-2"
                        key={i}>
                        <div className="flex">
                            <span>{i+1}</span>
                            <span>{item.name}</span>
                        </div>
                        <input value={item.bounty}
                            onChange={(e)=>{
                                setter(e.target.value,i)}}
                            placeholder={`Enter ${item.name}`}
                            className='border-2 rounded-md p-1'/>
                    </div>
                ))}
            </div>
    )
}

export default Bounty