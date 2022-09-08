
import axios from "axios";
import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import {BlockchainContext} from "../../context/BlockchainContext.tsx";
export default function CognitoCallback() {
    const {data, setData} = useContext(BlockchainContext);
    const {push, asPath} = useRouter();

    useEffect(() => {
        if (typeof window === "undefined" || !localStorage.getItem("data"))
            return;
        const access_token = asPath.split("#")[1]?.split("access_token=")[1]?.split("&")[0];
        let newData = data;
        if (access_token) {
            if (Object.keys(data).length === 0){
                if (localStorage.getItem("data")) {
                    console.log("setting data", data, Boolean(localStorage.getItem("data")))
                    newData = JSON.parse(localStorage.getItem("data"));
                    console.log("setting ", JSON.parse(localStorage.getItem("data")));
                    localStorage.removeItem("data");
                }
            }
            const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
                region: "ap-south-1",
            });
            const getUserCommand = new GetUserCommand({
                AccessToken: access_token,
            });

            const handleActualLogin = async () => {
                cognitoIdentityProviderClient.send(getUserCommand).then(async (user, err) => {
                    if (err) {
                        console.log("err", err);
                    } else {
                        if (user?.UserAttributes) {
                            const email = user.UserAttributes.find((item) => item.Name === "email")?.Value;
                            if (email !== "") {
                                console.log("Calling cognitoAPI",data, newData);
                                const response = await axios.post("/api/handleInitialLogin", {
                                    email,
                                    name: newData.user.name,
                                    skills: [],
                                    links: [],
                                    address : newData.user.address,
                                    addType: newData.user.addType
                                });
                                const {next, } = newData;
                                setData({
                                    ...newData,
                                    user: response.data,
                                    isLoggedIn: true
                                })
                                localStorage.setItem("userdata",JSON.stringify(response.data));
                                if (next)
                                    push(next);
                                else {
                                    push("/");
                                }
                            }
                        }
                    }
                });
            };
            handleActualLogin();
        }
    }, [push, setData, asPath, data]);

    return (
        <div>
          Please wait...
        </div>
    );
}

