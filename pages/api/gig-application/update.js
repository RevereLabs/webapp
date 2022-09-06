import {fetchGigApplications, } from "../../../../functions/gig.js";

export default async function handler(req, res) {

    let {
        objectId, ...rest
    } = req.body;
    const result = await fetchGigApplications({objectId});
    if (result.length === 0)
        throw new Error("No gig application found");

    const gigApplication = result[0];
    //iterate over rest
    for (const key in rest) {
        gigApplication.set(key, rest[key]);
    }
    await gigApplication.save();

    res.status(201).json({
        gigId: gigApplication.get("gigId"),
        contractId: gigApplication.get("contractId"),
        RNFTAddress: gigApplication.get("RNFTAddress"),
        applicantId: gigApplication.get("applicantId"),
        status: gigApplication.get("status"),
        formalJson: gigApplication.get("formalJson"),
        rocketChatChannelId: gigApplication.get("rocketChatChannelId"),
        rocketChatChannelName: gigApplication.get("rocketChatChannelName"),
    });
}
