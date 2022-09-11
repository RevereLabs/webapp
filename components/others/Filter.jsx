import React,{useState,useEffect} from 'react'
import Image from 'next/image'

function Filter({title,color,addFilter,filters}) {
    const[selected,setSelected] = useState(false)
    useEffect(()=>{
        const checkState = () => {
            const status = filters.includes(title);
            setSelected(status)
        }
        checkState();
    },[filters])

    return (
        <div onClick={event=>addFilter(title)}
            className="w-[90%] h-[20%] rounded-md my-2 px-2 flex justify-between items-center cursor-pointer "
            style={selected?{backgroundColor:color,color:"#FFFFFF"}:{backgroundColor:"#FFFFFF"}}>
            <h2>{title}</h2>
            {selected&&<Image src={'/vectors/tik.svg'}
                height={10}
                width={10}
                className="absolute right-0"/>}
        </div>
    )
}

export default Filter