import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');

const socketReducer = (state = {
    socket
}, action) => {
    switch(action.type){
        case 'MESSAGE':
            state = {
                ...state,
            };
            state.socket.emit('message', action.payload);
            break;
        default:
    }
    return state;
};

export default socketReducer;
