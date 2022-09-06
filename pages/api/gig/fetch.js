import {fetchGigs, } from "../../../../functions/gig.js";

export default async function handler(req, res) {
    const query_params = {};
    for (const key in req.query) {
        query_params[key] = JSON.parse(req.query[key]);
    }
    const results = await fetchGigs(query_params);
    res.status(200).json(results.map(gig => {
        return {
            title: gig.get("title"),
            description: gig.get("description"),
            bounty: gig.get("bounty"),
            time: gig.get("time"),
            issuedBy: gig.get("issuedBy"),
            completed: gig.get("completed"),
            category: gig.get("category"),
            objectId: gig.id,
        };
    }
    ));
}
