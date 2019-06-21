const authReducer = (state = {
    // user: ''
}, action) => {
    switch(action.type){
        case 'LOG_IN':
            state = {
                ...state,
            };
            break;
        case 'REFRESH':
            state = {
                ...state,
            };
            break;
        case 'LOG_OUT':
            state = {
                ...state,
            };
            break;
        default:
    }
    return state;
};

export default authReducer;
