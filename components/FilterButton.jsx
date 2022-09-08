import React,{useState} from 'react'
import Image from 'next/image'
import Filter from './others/Filter'

function FilterButton({filters,setFilters,isFilter=true}) {
    console.log(filters)
    const FilterTypes = [{title:'Hardcoded',color:'#85A9E8'},{title:'Development',color:'#85B9E8'},{title:'Design',color:'#FFC8C8'}]
    const[isOpen,setIsOpen] = useState(false)

    // const addFilter = (Title) => {
    //     let data = filters
    //     filters.includes(Title)?(data=data.filter(item => item!=Title)):data.push(Title)
    //     setFilters(data)
    // }
    

    return (
        <div className="mx-10 relative z-[0] m-10 overflow-visible">
            <div onClick={()=>setIsOpen(preVal=>!preVal)}
                className="z-[10] relative  w-[10rem]  h-[2rem] flex items-center justify-around border-2 rounded-md font-mada cursor-pointer drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] active:drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] bg-[#ffffff]">
                <h2 className="font-mada text-textSecondary font-[600] text-[1.2rem]">{isFilter?'Filter':'Categories'}</h2>
                {isOpen?<Image src={'/upArrow.png'}
                    height={10}
                    width={20}/>:<Image src={'/dropArrow.png'}
                    height={10}
                    width={20}/>}
                <div className="bg-main rounded-full absolute top-[-0.5rem] right-0 w-5 h-5 text-center text-accent">
                    {filters.length-1}
                </div>
            </div>


            {isOpen&&<div className="absolute pt-10 top-1 z-[0] w-[10rem] min-h-[5rem] flex flex-col items-center justify-around border-2 rounded-b-md font-mada bg-accent">
                {FilterTypes.map((item, i) =>(
                    <div className="w-[90%]" onClick={() => filters.includes(item.title)?
                                        setFilters(filters.filter(type => type!=item.title))
                                        :setFilters([...filters,item.title])}>
                        <Filter title={item.title}
                        color={item.color}
                        filters={filters}
                        key={i}/>
                    </div>
                ))}
            </div>}


        </div>
    )
}

export default FilterButton