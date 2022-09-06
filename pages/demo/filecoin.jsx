// react functional component

import React from "react";
import {file_coin_upload} from "../../utils/filecoin";

export default function Chat() {

    return (
        <div>
            <button onClick={async () => {
                await file_coin_upload({
                    "name": "Herbie Starbelly",
                    "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",
                    "image": "https://storage.googleapis.com/opensea-prod.appspot.com/creature/50.png",
                });
            }}>Upload</button>
        </div>
    );
}

