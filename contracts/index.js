import { bytecode, abi } from "./abi.js";
import { ethers } from "ethers";
import { abi  as RNFT_abi} from "./RNFT_abi";
import { abi  as RTN_abi} from "./RTN_abi";
const RGCNFTAddress = "0x2266446cDc69fcD5a9c0c79D30506f67644E2610";
const RNFTAddress = "0xe1f74C2D2bACb54eA5EdC8b4C564B2C0eFfd2457";
const RTNAddress ="0xeFC553cD055bE95986EE3613AE11647Ed69a6b94";
async function deployContract(provider, checkpoints, freelancer, clientAmount, freelancerStake, freelancerCompensationIfClientCancels) {
    console.log(provider,checkpoints,freelancer,clientAmount,freelancerStake,freelancerCompensationIfClientCancels, "is important");

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log(signer," provider");
    let factory = new ethers.ContractFactory(abi, bytecode, signer);
    console.log(checkpoints, freelancer, clientAmount,
        freelancerStake, RGCNFTAddress, RTNAddress, freelancerCompensationIfClientCancels, " setttt");

    let contract = await factory.deploy(checkpoints, freelancer, clientAmount,
        freelancerStake, RGCNFTAddress, RTNAddress, freelancerCompensationIfClientCancels);
    return contract;
}

async function mintAndApprove(provider,escrowAddress,tokenURL) {
    console.log(provider, escrowAddress, " provider is herer");
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    let contract = new ethers.Contract(RNFTAddress, RNFT_abi, signer);
    const minting = await contract.mint(userAddress,tokenURL);
    let receipt = await minting.wait();
    let tokenId = receipt.logs[0].topics[3];
    tokenId =  parseInt(tokenId);
    const approving = await contract.approve(escrowAddress,tokenId);
    let mintingReceipt = await approving.wait();
    return tokenId;
}


async function transferRNFTToEscrow(provider,escrowAddress,tokenId) {
    console.log(provider, escrowAddress, tokenId, " provider is herer");
    const signer = provider.getSigner();
    let contract = new ethers.Contract(escrowAddress, abi, signer);
    console.log(contract, "contract");
    const depositing = await contract.depositRNFT(RNFTAddress,tokenId);
    console.log(depositing, "depositing");

    let receipt = await depositing.wait();
    console.log(receipt, "receipt");

    return receipt;
}


async function getProjectState(provider,escrowAddress){
    console.log(provider, escrowAddress, " provider is herer");
    const signer = provider.getSigner();
    let contract = new ethers.Contract(escrowAddress, abi, signer);
    const getting = await contract.getProjectState();
    console.log(getting,"getting");
    return getting;
}

async function approveAndTransfer(provider, escrowAddress, entity, quantity) {
    console.log(provider, escrowAddress,entity,quantity ," provider is herer");
    const signer = provider.getSigner();
    const RTNContract = new ethers.Contract(RTNAddress, RTN_abi, signer);
    await (await RTNContract.approve(escrowAddress,quantity)).wait();
    const escrowContract = new ethers.Contract(escrowAddress, abi, signer);
    if (entity=== "freelancer")
        await (await escrowContract.depositFundsAsFreelancer()).wait();
    else if (entity === "client")
        await (await escrowContract.depositFundsAsClient()).wait();
}

async function gotoNextCheckpoint(provider, escrowAddress, entity) {
    console.log(provider, escrowAddress,entity ," 2provider is herer");
    const signer = provider.getSigner();
    const escrowContract = new ethers.Contract(escrowAddress, abi, signer);
    if (entity=== "freelancer")
        await (await escrowContract.increaseFreelancerCheckpoint()).wait();
    else if (entity === "client")
        await (await escrowContract.increaseClientCheckpoint()).wait();
}

async function getCheckpointStatus(provider, escrowAddress) {
    const signer = provider.getSigner();
    const escrowContract = new ethers.Contract(escrowAddress, abi, signer);
    return await  escrowContract.getCheckpointStatus();
}

async function disburseFunds(provider, escrowAddress) {
    const signer = provider.getSigner();
    const escrowContract = new ethers.Contract(escrowAddress, abi, signer);
    await (await escrowContract.disburseFunds()).wait();
}

export { deployContract, mintAndApprove, transferRNFTToEscrow, getProjectState,
    approveAndTransfer, gotoNextCheckpoint, getCheckpointStatus, disburseFunds };
