import React,{useState} from 'react'
import Button from '../Button';

function Checkpoints({json, setJSON}) {
    console.log("fff", json)
    const colors = ['rgba(17, 120, 215, 0.5)','rgba(0, 138, 97, 0.5)','rgba(177, 1, 1, 0.5)','rgba(214, 200, 80, 0.5)']
    const [value, setValue] = useState("");

    if (!json.checkpoints)
        setJSON({...json, checkpoints: []});
    
    const onSubmit =() => {
        const tagData = {name :value, color:colors[Math.floor(Math.random() * 3)]};
        setJSON({...json, checkpoints: [...(json.checkpoints),tagData]});
        setValue("");
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
                    value={value}
                    placeholder={'Develop by...'}
                    onChange={(e) =>{
                        setValue(e.target.value);
                    } } />
                <Button Content={'Submit'}
                    onClick={onSubmit}/>
            </div>
        </div>
    )
}

export default Checkpoints;