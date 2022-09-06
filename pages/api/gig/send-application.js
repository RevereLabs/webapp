import {sendGigApplication, } from "../../../../functions/gig.js";

export default async function handler(req, res) {
    const query_params = {};
    for (const key in req.query) {
        query_params[key] = JSON.parse(req.query[key]);
    }
    console.log(query_params['gigId'],query_params['me'],"query_params");
    const results = await sendGigApplication(query_params['gigId'],query_params['me']);
    console.log(results," are results");
    res.status(200).json(results);
}
