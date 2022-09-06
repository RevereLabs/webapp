import {fetchGigApplications, } from "../../../../functions/gig.js";

export default async function handler(req, res) {
    const query_params = {};
    for (const key in req.query) {
        query_params[key] = JSON.parse(req.query[key]);
    }
    const results = await fetchGigApplications(query_params);

    res.status(200).json(results.map(gigApplication => {
        return {
            gigId: gigApplication.get("gigId"),
            contractId: gigApplication.get("contractId"),
            applicantId: gigApplication.get("applicantId"),
            status: gigApplication.get("status"),
            RNFTAddress: gigApplication.get("RNFTAddress"),
            formalJson: gigApplication.get("formalJson"),
            rocketChatChannelId: gigApplication.get("rocketChatChannelId"),
            rocketChatChannelName: gigApplication.get("rocketChatChannelName"),
            objectId: gigApplication.id,
        };
    }
    ));
}
