import React, { useEffect, useState, useContext } from 'react'
import Button from './Button'
import Image from 'next/image'
import '../pages/_document'
import Link from 'next/link';
import {
    BlockchainContext,
} from "../context/BlockchainContext.tsx";

import { useRouter } from 'next/router'

function Navbar() {
    const router = useRouter();
    const [pageLocation,setPageLocation] =useState(router.pathname);
    const {connectedAccount, setData, data} =
    useContext(BlockchainContext);


    const Logout = () => {
        localStorage.removeItem('userdata');
        router.push('/');
    }


    useEffect(() => {
        if(data?.user?.address){
            console.log("sd");
        }
        const getPageLocation = () => {
            const res = router.pathname;
            setPageLocation(res);
            console.log(pageLocation);
        }
        getPageLocation();
    })



    return (
        <>
            <div className="hidden md:flex relative justify-between items-center  p-10 font-Mada text-[1vw] w-[100%] z-2 ">
                <Link href="/">
                    <Image src="/logo.png"
                        width={120}
                        height={60}
                        alt="logo" />
                </Link>
                {/* login && (<></>) */}
                <div className="flex justify-between w-[25%] text-textMain text-[1rem] small:hidden cursor-pointer">
                    <Link href="/"><span style={pageLocation === '/' ? { color: "#1178D7" } : {}}>Home</span></Link>
                    <Link href="/gig/create"><span style={pageLocation === '/gig/create' ? { color: "#1178D7" } : {}}>Post Gig</span></Link>
                    <Link href="https://linktr.ee/reverelabs">Contact Us</Link>
                <Link href="https://faucet.reverelabs.org">RTN Faucet</Link>
            </div>
            <div className="hidden">
                <div className='flex flex-row justify-between items-center w-full'>
                    <Link href="/">
                        <Image src="/logo.png"
                            width={120}
                            height={60}
                            alt="logo" />
                    </Link>

                    <div>
                        {!data?.isLoggedIn ? <Button Content={'Login'}
                            link={'/login'} /> :
                            <Button Content={'Your Profile'}
                                link={'/Profile'} />}
                    </div>

                </div>
                <div className="flex justify-between w-full mt-10 text-textMain text-[1rem] cursor-pointer">
                    <Link href="/"><span style={pageLocation === '/' ? { color: "#1178D7" } : {}}>Home</span></Link>
                    <Link href="/gig/create"><span style={pageLocation === '/gig/create' ? { color: "#1178D7" } : {}}>Post Gig</span></Link>
                    <Link href="https://linktr.ee/reverelabs">Contact Us</Link>
                    <Link href="https://faucet.reverelabs.org">RTN Faucet</Link>
                </div>


                </div>

            {data?.isLoggedIn?
                (pageLocation==='/Profile'?<Button Content={'Logout'}
                    onClick={Logout}/>:
                    <Button Content={'Your Profile'}
                        link={'/Profile'}/>):
                (<Button Content={'Login'}
                    link={'/auth'}/>)
            }
        </div>

    )
}

export default Navbar
