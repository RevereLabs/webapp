
import React from "react";
import ClientChatWindow from "./ClientChatWindow";
import FreelancerChatWindow from "./FreelancerChatWindow";
function ChatWindow({isUserLoggedIn=false,details,isOwner,isPosted, modeToggle}) {
    let InternalChatWindow = FreelancerChatWindow;
    if(isOwner)
        InternalChatWindow = ClientChatWindow;
    return (
        <InternalChatWindow
            gig={details}
            isUserLoggedIn={isUserLoggedIn}
            details={details}
            isOwner={isOwner}
            modeToggle={modeToggle}
            isPosted={isPosted}
        />);
}

export default ChatWindow;
