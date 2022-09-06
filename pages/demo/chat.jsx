
import React, {useEffect} from "react";
import {goToChannelChat, sendTokenToChat} from "../../utils/chat";


export default function Chat({userToken, otherUserToken, isOwner}) {
    console.log(userToken,"is uer dtZ");
    // create a ref
    const myRef = React.createRef();

    useEffect(() => {
        window.addEventListener('message', function(e) {
            if (e.origin !== "https://chat.collabamigo.xyz" || e?.data?.eventName !== 'startup')
                return;
            sendTokenToChat(myRef, userToken);
            setTimeout(() => {
                goToChannelChat(myRef, otherUserToken);
            }, 2000);
        });
    }, [myRef, otherUserToken, userToken])

    return (
        <div>
            {isOwner&&
            <button onClick={() => {
                goToChannelChat(myRef, otherUserToken)
                console.log(otherUserToken,"otherUserToken");
            }}>Talk to Freelancer</button>}
            <iframe
                className="w-96 h-96"
                ref={myRef}
                src="https://chat.collabamigo.xyz/channel/general/?layout=embedded"
                title="myframe"
            ></iframe>

        </div>
    );
}

