import {createGig, } from "../../../../functions/gig.js";

export default async function handler(req, res) {

    let {
        title, description, bounty, time, issuedBy, category
    } = req.body;
    const result = await createGig(title, description, bounty, time, issuedBy, category);
    console.log(result);

    res.status(201).json({id: result.id});
}
