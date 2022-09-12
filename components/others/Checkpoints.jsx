import React,{useState} from 'react'
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '../Button';

function Checkpoints({json, setJSON}) {
    const colors = ['rgba(17, 120, 215, 0.5)','rgba(0, 138, 97, 0.5)','rgba(177, 1, 1, 0.5)','rgba(214, 200, 80, 0.5)']
    const [tagData, setTagData] = useState();
    const [checkpoints,setCheckpoints] = useState(json?.checkpoints);
    
    const onSubmit =() => {
        if(json){
            setCheckpoints([...json.checkpoints,tagData]);
        }
        let data = json;
        !('checkpoints' in data) && (data.checkpoints = [])
        data?.checkpoints?.push(tagData);
        setJSON(data);
    }

    return (
        <div className="bg-[white] h-[100%]  flex justify-between p-2">
            <div className="w-[50%] h-[100%] flex flex-col justify-start pt-5">
                {checkpoints?.map((item,i)=>(
                    <div className="flex items-center w-[12rem] text-[0.75rem] mt-2"
                        key={i} >
                        <p>🗓</p>
                        <div className="rounded-md px-2 mx-1"
                        style={{backgroundColor:item.color}}>
                        {item.name}</div>
                    </div>
                ))}
            </div>
            <div className="w-[50%] h-[100%] flex flex-col justify-around relative">
                <p>Enter Checkpoint 🗓</p>
                <input type="text"
                    className='w-30 border-2 rounded-md border-main'
                    value={tagData?.name}
                    placeholder={'Develop by...'}
                    onChange={(e) =>{
                        setTagData({...tagData , name :e.target.value, color:colors[Math.floor(Math.random() * 3)]})
                    } } />
                <Button Content={'Submit'} onClick={onSubmit}/>
            </div>
        </div>
    )
}

export default Checkpoints;