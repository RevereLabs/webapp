import {useRouter} from "next/router";
import React from 'react'
import Image from 'next/image'
import GigCard from '../../../components/containers/GigCard';

export default function Project() {
    const router = useRouter()
    const { gigId } = router.query;
    if (!gigId)
        return <div>No gig id provided</div>

    return (
        <div className="flex flex-col items-center">
            <GigCard
                gigId={gigId}
            />
            <a className="absolute z-0 top-[20%] left-[5%]">
                <Image
                    src="/background/circle.png"
                    height={700}
                    width={700}
                    alt=""
                />
            </a>
            <div className="mt-10 w-[60%] flex items-center justify-end">
            </div>
        </div>
    )
}

