import React, {useEffect, useContext, useState}  from 'react'
import Image from 'next/image';
import Progress from '../../components/Progress'
import style from '../../styles/LogInCard.module.scss'
import LoginButton from '../../components/LoginButton';
import login from '../../data/login.json'

import {
    BlockchainContext,
} from "../../context/BlockchainContext.tsx";
function Login() {
    const [stepsDone,setStepsDone] = useState(1);
    const {connectedAccount, setData, data} =
      useContext(BlockchainContext);
    const [name,setName] = useState('')

    useEffect(()=>
    {
        if(connectedAccount) {
            setStepsDone(2);
        }
    },[connectedAccount]);

    const saveName = () => {
        setData({...data, "user": {name}});
        setStepsDone(2);
    }

    console.log( name,data, "lklklk");

    return (

        <div className={style.container}>
            <div className="mb-10 w-[45rem] relative z-2">
                <Progress steps={3}
                    stepsDone={stepsDone}/>
                <div className="relative z-2 mt-10 flex flex-col justify-center items-center w-[45rem] h-[30rem] bg-[#9DCEFB]  border-2 rounded-[5px] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">
                    {stepsDone===1&&<>
                        <Image src={'/vectors/user.png'}
                            height={100}
                            width={100}/>
                        <form onSubmit={saveName}>
                            <input
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Enter Your Name"
                                type="search"
                                className="p-1 border-2 rounded-md cursor-text drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] mt-10  bg-[#ffffff]"
                            />
                        </form>
                        <h2 className="font-mada font-[500] w-[60%] mt-10">we need your  Wallets for setting up the escrow services only when you sign an agreement.</h2>
                    </>}
                    {stepsDone===2&&<>
                        {login.Web3Providers.map((item, i)=>(
                            <LoginButton APIlink={'#'}
                                item={item}
                                setStepsDone={setStepsDone}
                                stepsDone={stepsDone}
                                key={i}/>
                        )) }
                        <h2 className="font-mada font-[500] w-[60%] mt-10">We need your  Wallets for setting up the escrow services only when you sign an agreement.</h2>
                    </>}
                    {stepsDone===3&&<>
                        {login.FaangProviders.map((item, i)=>(
                            <LoginButton APIlink={'#'}
                                item={item}
                                setStepsDone={setStepsDone}
                                stepsDone={stepsDone}
                                key={i}/>
                        )) }
                        <h2 className="font-mada font-[500] w-[60%] mt-10">We need your google credentials to connect you to freelancers and identify you as a client.</h2>
                    </>}
                </div>




                <div className="absolute top-[10rem] left-[-8rem] z-0"><Image src='/background/rectangle.svg'
                    height='500'
                    width='800'/></div>
            </div>
        </div>
    )
}

export default Login
