export const sendTokenToChat = (rocketChatRef, token) => {
    
    rocketChatRef?.current?.contentWindow.postMessage({
        externalCommand: 'login-with-token',
        token: token
    }, '*')
}

export const goToDirectChat = (rocketChatRef, chatId) => {
    rocketChatRef.current.contentWindow.postMessage({
        externalCommand: 'go',
        path: `/direct/${chatId}`
    }, '*')
}

export const goToChannelChat = (rocketChatRef, chatId) => {
    console.log('goToChannelChat', chatId)
    rocketChatRef?.current?.contentWindow.postMessage({
        externalCommand: 'go',
        path: `/channel/${chatId}`
    }, '*')
}
