import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK, 
        options: {
            appName: "revere",
            infuraId: process.env.INFURA_KEY 
        }
    },
    walletconnect: {
        package: WalletConnect, 
        options: {
            infuraId: process.env.INFURA_KEY 
        }
    }
};

export default providerOptions;