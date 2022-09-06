// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState, createContext, } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {sequence} from "0xsequence";

export type AppContextProps = {
    connectedAccount: string | undefined;
    connectWallet: Function;
    disconnect: Function;
    getProvider: Function;
    data : object;
    setData: Function;
};

export const BlockchainContext = createContext<AppContextProps>(
  {} as AppContextProps
);

type Props = {
  children: React.ReactNode;
};

export const BlockchainProvider = ({ children }: Props) => {
    const [connectedAccount, setConnectedAccount] = useState<
    string | undefined
  >();

    const [data, setData] = useState<object>({});
    useEffect(() => {
        if ((data === {} || !(data?.user?.id)) && window && localStorage?.getItem("userdata")) {
            const user = JSON.parse(localStorage.getItem("userdata"));
            setData({...data, user, isLoggedIn: true});
            console.log("data set")
        }
    }, [data]);

    const connectWallet = async (firstTime = false) => {
        console.log("Connecting metamask...");
        const web3Modal = new Web3Modal({providerOptions:{

            sequence: {
                package: sequence,
                options: {
                    appName: 'Web3Modal Demo Dapp',
                    defaultNetwork: 'polygon'
                }
            }
        },
        cacheProvider: false });
        const connection = await web3Modal.connect();
        console.log(connection, "ye raha jadoo");
        const provider = new ethers.providers.Web3Provider(connection);
        console.log(provider, "ye raha jadoo2");
        const accounts = await provider.listAccounts();
        console.log(accounts, "addresses rea")
        if (accounts) {
            setConnectedAccount(accounts[0]);
            setData({...data ,
                user :{
                    ...(data?.user),
                    address:accounts[0],
                    addType: 'metamask'
                }
            })

            if (firstTime) {
                localStorage.setItem("connected", accounts[0]);
            }
        }
    };

    const getProvider = async () => {
        // if (connectedAccount == undefined) {
        //     console.log("check");
        //     return;
        // }
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        return new ethers.providers.Web3Provider(connection);
    };

    const disconnect = async () => {
        const web3Modal = new Web3Modal({ cacheProvider: true });
        if (web3Modal.cachedProvider) {
            web3Modal.clearCachedProvider();
            setConnectedAccount(undefined);
            localStorage.removeItem("connected");
        }
    };

    const checkIsWalletConnected = async () => {
        const connected = localStorage.getItem("connected");

        if (connected != null && data!= null) {
            console.log(connected,data);
            console.log("connected ", connected);
        }
    };

    useEffect(() => {

        checkIsWalletConnected();
        try {
            if(data?.user?.address && connectedAccount === data?.user?.address){
                console.log("Working perfectly, Both accounts are same");
                console.log(connectedAccount,data?.user?.address);
            }

        } catch (error) {
            console.log("Different accounts");
            console.log(connectedAccount,data?.user?.address);

        }
    }, [checkIsWalletConnected]);

    return (
        <BlockchainContext.Provider
            value={{ connectWallet, data, disconnect, getProvider, connectedAccount, setData }}
        >
            {children}
        </BlockchainContext.Provider>
    );
};
