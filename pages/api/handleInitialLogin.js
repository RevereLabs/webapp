import {createOrUpdateUser, } from "../../../functions/utils.js";
import {sendWelcomeEmail, sendRepeatEmail, } from "../../../functions/email.js";
export default async function handler(req, res) {

    let {
        email, name, skills, links, associations, additional, address, addType
    } = req.body;
    const [user, created] = await createOrUpdateUser(email, name, skills, links, associations, additional, address, addType);
    if (created) {
        sendWelcomeEmail(email, name);
    }
    else {
        sendRepeatEmail(email, name, associations);
    }
    // this.rocketChatId = null;
    // this.rocketChatToken = null;
    // this.rocketChatPassword = null;
    name = user.get("name");
    email = user.get("email");
    skills = user.get("skills");
    links = user.get("links");
    associations = user.get("associations");
    address = user.get("address");
    addType = user.get("addType");
    const rocketChatId = user.get("rocketChatId");
    const rocketChatToken = user.get("rocketChatToken");


    console.log(user, user.get());


    res.status(200).json({ name, skills, links, associations, email, created, address, addType, "id":user.id,
        rocketChatId, rocketChatToken});
}
