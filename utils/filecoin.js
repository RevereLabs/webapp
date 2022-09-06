import { Web3Storage } from 'web3.storage';

export async function file_coin_upload(obj) {
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzMTA5MTQ3NzhFNjZFODI2OWM0ZDY4QjdjODRGQjA0MGI4MmY4N2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA0MDY5NDA5MDYsIm5hbWUiOiJ0ZXN0In0.JpiiZaMyBl4MttJOsXbzXO4iHIl-xh5-hhPpCvBjLqA" });
    const blob = new File([JSON.stringify(obj)], { type: "text/json" });
    const rootCid = await client.put([blob]);
    console.log(rootCid);
    // redirect
    // window.location.href = `https://dweb.link/ipfs/${rootCid}`;
    // return rootCid;
    // window.location = `https://${rootCid}.ipfs.dweb.link/[object Object]`;
    return `https://${rootCid}.ipfs.dweb.link/[object Object]`;
}

export async function create_ipfs_for_gig(gig, image_url) {
    return await file_coin_upload({
        "name": gig.title,
        "description": gig.description,
        "image": image_url,
    });
}
