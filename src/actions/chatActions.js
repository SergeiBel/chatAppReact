export function sendMessage(message) {
    return {
        type: 'MESSAGE',
        payload: message
    }
}

export function setActiveChat(data) {
    return {
        type: 'SET_ACTIVE_CHAT',
        payload: data
    }
}

export function saveChatList(data) {
    return {
        type: 'SAVE_CHAT_LIST',
        payload: data
    }
}

export function addOneChat(data) {
    return{
        type: 'ADD_ONE_CHAT',
        payload: data
    }
}

export function clearStore(data) {
    return{
        type: 'CLEAR_STORE',
        payload: data
    }
}
