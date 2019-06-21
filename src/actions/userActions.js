export function saveUser(user) {
    return {
        type: 'SAVE_USER',
        payload: user
    }
}

export function deleteUser(data) {
    return {
        type: 'DELETE_USER',
        payload: data
    }
}

export function initApp(data){
    return {
        type: 'INIT_APP',
        payload: data
    }}


