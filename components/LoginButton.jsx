import React, {useEffect, useContext} from 'react'
import Image from 'next/image'
import web3 from "web3";
import {
    BlockchainContext,
} from "../context/BlockchainContext.tsx";
import { sequence } from "0xsequence";



function LoginButton({item,setStepsDone,stepsDone}) {

    const { connectWallet, data} =
      useContext(BlockchainContext);
    let wallet = sequence.initWallet('polygon');


    function login_redirect() {
        localStorage.setItem("data",JSON.stringify(data));
        let value = "https://reverelabs.xyz";
        if(typeof window !== "undefined"){
            value = window.location.origin;
        }
        const callback_url = value + "/auth/cognitocallback";
        window.location = `https://reverelabs.auth.ap-south-1.amazoncognito.com/oauth2/authorize?client_id=69li1ve6kfpq02uv7vo3fhvgb6&response_type=token&redirect_uri=${callback_url}`;
    }

    async function handleCheck() {
        let chainId = 80001;

        if (window.ethereum.networkVersion !== chainId) {
            try {
                console.log("trying to connect to network");
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{chainId: web3.utils.toHex(chainId)}],
                });
            } catch (err) {
                console.log(err, "error");
                // This error code indicates that the chain has not been added to MetaMask.
                if (err.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainName: "Mumbai Testnet",
                                chainId: web3.utils.toHex(chainId),
                                nativeCurrency: {
                                    name: "MATIC",
                                    decimals: 18,
                                    symbol: "MATIC",
                                },
                                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                                blockExplorerUrls: ["https://polygonscan.com/"],
                            },
                        ],
                    });
                }
            }
        }
    }

    const onClicked = async () => {
        if (item.titleHighlighted === "wallet") {
            console.log("dsf");
            await connectWallet(true);
            setStepsDone(stepsDone + 1);

        } else if (item.titleHighlighted === ' Sequence wallet'){
            console.log("here is sequence");
            wallet = sequence.getWallet();
            const connectDetails = await wallet.connect({
                app: 'RevereLabs',
                authorize: true,
                // And pass settings if you would like to customize further
                settings: {
                    theme: "light",
                    bannerUrl: "https://yoursite.com/banner-image.png",  // 3:1 aspect ratio, 1200x400 works best
                    includedPaymentProviders: ["moonpay", "ramp"],
                    defaultFundingCurrency: "matic",
                    lockFundingCurrencyToDefault: false,
                }
            })


            console.log('user accepted connect?', connectDetails.connected, connectDetails);
            console.log('users signed connect proof to valid their account address:', connectDetails.proof);

        }
        else if (item.titleHighlighted === "AWS Cognito") {
            login_redirect();

        }
    }

    useEffect(() => {
        handleCheck();
    }, []);

    return (
        <>
            <button onClick={onClicked}
                className="w-[20rem] h-[5rem] mt-5 flex justify-center items-center rounded-[8px] hover:drop-shadow-[5px_5px_0px_rgba(159,159,159,1)]"
                style={{backgroundColor: item.backgroundColor}}>
                <Image src={item.logo}
                    height="40"
                    width="50"/>
                <span className="ml-10 font-mada font-[600] text-textMain">{item.title} <span
                    style={{color: item.color}}>{" " + item.titleHighlighted}</span></span>
            </button>
        </>
    )
}

export default LoginButton;
