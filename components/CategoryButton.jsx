
import React,{useState} from 'react'
import Image from 'next/image'
import Filter from './others/Filter'

function CategoryButton({categories,setCategories}) {
    const categoryType = [{title:'Hardcoded',color:'#85A9E8'},{title:'Development',color:'#85B9E8'},{title:'Design',color:'#FFC8C8'}]
    const[isOpen,setIsOpen] = useState(false)

    return (
        <div className="mx-10 relative z-[0] m-10 overflow-visible">
            <div onClick={()=>setIsOpen(preVal=>!preVal)}
                className="z-[10] relative  w-[10rem]  h-[2rem] flex items-center justify-around border-2 rounded-md font-mada cursor-pointer drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] active:drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] bg-[#ffffff]">
                <h2 className="font-mada text-textSecondary font-[600] text-[1.2rem]">Categories</h2>
                {isOpen?<Image src={'/upArrow.png'}
                    height={10}
                    width={20}/>:<Image src={'/dropArrow.png'}
                    height={10}
                    width={20}/>}
            </div>

            {isOpen&&<div className="absolute pt-10 top-1 z-[0] w-[10rem] min-h-[5rem] flex flex-col items-center justify-around border-2 rounded-b-md font-mada bg-accent">
                {categoryType.map((item, i) =>(
                    <div className="w-[90%]" onClick={() => categories == item.title?
                                        setCategories('')
                                        :setCategories(item.title)}>
                        <Filter title={item.title}
                        color={item.color}
                        filters={categories}
                        key={i}/>
                    </div>
                ))}
            </div>}


        </div>
    )
}

export default CategoryButton