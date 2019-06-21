import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');

const chatReducer = (state = {
    socket,
    activeChat:'',
    chatList:[],
}, action) => {
    switch(action.type){
        case 'MESSAGE':
            state = {
                ...state,
            };
            break;
        case 'SET_ACTIVE_CHAT':
            state = {
                ...state,
                activeChat: action.payload
            };
            break;
        case 'SAVE_CHAT_LIST':
            state = {
                ...state,
                chatList: [...state.chatList, ...action.payload]
            };
            break;
        case 'ADD_ONE_CHAT':
            state = {
                ...state,
                chatList: [...state.chatList, action.payload]
            };
            break;
        // case 'CLEAR_STORE':
        //     state = {
        //         ...state,
        //         socket: {}
        //     };
        //     break;
        default:
    }
    return state;
};

export default chatReducer;
