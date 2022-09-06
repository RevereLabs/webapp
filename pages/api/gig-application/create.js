import {sendGigApplication, } from "../../../../functions/gig.js";

export default async function handler(req, res) {

    let {
        gigId, me
    } = req.body;
    const result = await sendGigApplication(gigId, me);
    console.log(result);

    res.status(201).json({id: result.id});
}
