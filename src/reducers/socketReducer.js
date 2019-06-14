import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');

const socketReducer = (state = {
    socket,
    room: '',
}, action) => {
    switch(action.type){
        case 'MESSAGE':
            state = {
                ...state,
            };
            break;
        case 'JOIN_ROOM':
            state = {
                ...state,
                room:  action.payload,
            };
            break;
        case 'LEAVE_ROOM':
            state = {
                ...state,
            };
            // state.socket.emit('leave', action.payload);
            break;
        default:
    }
    return state;
};

export default socketReducer;
