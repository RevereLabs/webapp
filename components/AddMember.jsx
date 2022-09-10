import React, { useState } from 'react'
import Image from 'next/image'
import { Menu } from '@headlessui/react'

function AddMember() {

    const[freeLancerEmail,setFreeLancerEmail] = useState("")

    const onclickHandler = () =>{
        console.log(freeLancerEmail)
        //handle
    }

    return (
        <div className="absolute top-[-2rem] right-[-4rem] w-[50%] flex flex-col items-center">
            <Menu>
                <Menu.Button className="cursor-pointer mt-10 icon">
                    <Image src={'/vectors/plus.png'}
                        width={20}
                        height={20}/>
                </Menu.Button>
                <Menu.Items className="absolute top-[1.5rem] right-[5rem] w-[100%] flex flex-col items-center" >
                    <input value={freeLancerEmail}
                        onChange={(e)=>setFreeLancerEmail(e.target.value)}
                        onKeyDown={onclickHandler}
                        type="text"
                        className="p-1 rounded-[5px] border-2 mt-2 w-[60%] z-[10]"
                        placeholder="enter name"/>
                    <div className="w-[60%] h-auto p-10 bg-[white] border-2 mt-[-10px]">
                        {//datamap of the developer profiles from the search api
                        }
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export async function getServerSideProps() {
    //call to get developers
}


export default AddMember