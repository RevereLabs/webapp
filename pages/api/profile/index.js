import {getCompletedGigsByApplicantId, } from "../../../../functions/utils.js";

export default async function handler(req, res) {

    let {
      applicantId
    } = req.body;
    let answer = await getCompletedGigsByApplicantId(applicantId);
    console.log(answer);
    res.status(200).json({answer });
}
