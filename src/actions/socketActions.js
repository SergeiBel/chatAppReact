export function sendMessage(message) {
    return {
        type: "MESSAGE",
        payload: message
    }
}
