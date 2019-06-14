 export function sendMessage(message) {
    return {
        type: 'MESSAGE',
        payload: message
    }
}

export function joinRoom(data) {
    return {
        type: 'JOIN_ROOM',
        payload: data
    }
}

export function leaveRoom(data) {
    return {
        type: 'LEAVE_ROOM',
        payload: data
    }
}
