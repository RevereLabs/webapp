import React,{useState} from 'react'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function Checkpoints({json, setJSON}) {
    const [value, onChange] = useState(new Date());
    const [tagData, setTagData] = useState();

    const onSubmit =() => {
        console.log(json,"is here")
        let data = json;
        !('checkpoints' in data) && (data.checkpoints = [])
        console.log(data," is data")
        data?.checkpoints?.push(tagData);
        setJSON(data);
    }

    return (
        <div className="bg-[white] h-[100%]  flex justify-between p-2">
            <div className="w-[50%] h-[100%] flex flex-col justify-start pt-5">
                {json?.checkpoints?.map((item,i)=>(
                    <div className="flex items-center w-[12rem] text-[0.75rem] mt-2"
                        key={i}>
                        <p>🗓</p>
                        <div className="rounded-md px-2 mx-1"
                        >{item.name}</div>
                        <p className="text-secondary">{item.date}</p>
                    </div>
                ))}
            </div>
            <div className="w-[50%] h-[100%] flex flex-col justify-around relative">
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    onSubmit();
                }}>
                    <label> Checkpoint:</label>
                    <input type="text"
                        className='w-20'
                        value={tagData?.name}
                        onChange={(e) =>{
                            console.log(e);
                            setTagData({...tagData , name :e.target.value})
                        } } />

                  
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Checkpoints;