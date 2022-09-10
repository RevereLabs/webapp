import {createOrUpdateUser, } from "../../../functions/utils.js";
import {sendWelcomeEmail, sendRepeatEmail, } from "../../../functions/email.js";
export default async function handler(req, res) {

    let {
        email, name, skills, links, associations, additional, address, addType, profilePic
    } = req.body;
    const [user, created] = await createOrUpdateUser(email, name, skills, links, associations, additional, address, addType, profilePic);
    if (created) {
        sendWelcomeEmail(email, name);
    }
    else {
        sendRepeatEmail(email, name, associations);
    }

    name = user.get("name");
    email = user.get("email");
    skills = user.get("skills");
    links = user.get("links");
    associations = user.get("associations");
    address = user.get("address");
    addType = user.get("addType");
    profilePic = user.get("profilePic");
    const rocketChatId = user.get("rocketChatId");
    const rocketChatToken = user.get("rocketChatToken");


    console.log(user, user.get());


    res.status(200).json({ name, skills, links, associations, email, created, address, addType, profilePic, "id":user.id,
        rocketChatId, rocketChatToken});
}
