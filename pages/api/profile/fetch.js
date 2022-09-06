import {fetchUsers, } from "../../../../functions/utils.js";

export default async function handler(req, res) {
    const query_params = {};
    for (const key in req.query) {
        query_params[key] = JSON.parse(req.query[key]);
    }
    const results = await fetchUsers(query_params);

    res.status(200).json(results.map(user => {
        return {
            name: user.get("name"),
            skills: user.get("skills"),
            links: user.get("links"),
            associations: user.get("associations"),
            email: user.get("email"),
            created: user.get("created"),
            address: user.get("address"),
            addType: user.get("addType"),
            id: user.id,
            rocketChatId: user.get("rocketChatId"),
        };
    }
    ));
}
