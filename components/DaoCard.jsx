import React from 'react'
import Image from 'next/image'

function DaoCard({daoImage='/dao.png',gigsProvided,gigsDone,memberCount,descp,link}) {
    return (
        <a href={link}
            className="flex w-[25rem]  p-2 pt-5 mx-5 my-10 border-2 rounded-md font-mada cursor-pointer drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] active:drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] bg-[#ffffff]">
            <Image src={daoImage}
                height={280}
                width={250}/>
            <div className="pt-5">
                <div className="h-[0.1rem] bg-[#DBDBDB]"></div>
                <p className="font-[600] text-main text-[0.95rem]">
                    {memberCount}
                    <span className="text-textMain"> Members</span>
                </p>
                <p className="font-[600] text-secondary text-[0.95rem]">
                    {gigsDone}
                    <span className="text-textMain"> Gigs Completed</span>
                </p>
                <p className="font-[600] text-[red] text-[0.95rem]">
                    {gigsProvided}
                    <span className="text-textMain"> Gigs Provided</span>
                </p>
                <p className="font-[400] text-textSecondary text-[0.8rem]">{descp}</p>
            </div>
        </a>
    )
}

export default DaoCard