const userReducer = (state = {
    id: '',
    login: '',
}, action) => {
    switch(action.type){
        case 'SAVE_USER':
            localStorage.setItem('ACCESS_TOKEN', action.payload.jwt);
            localStorage.setItem('REFRESH_TOKEN', action.payload.refreshToken);
            localStorage.setItem('_ID', action.payload.userId);
            localStorage.setItem('LOGIN', action.payload.login);
            state = {
                ...state,
                _id: action.payload.userId,
                login: action.payload.login,
            };
            break;
        case 'DELETE_USER':
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
            localStorage.removeItem('_ID');
            state = {
                ...state,
                _id: null,
            };
            break;
        case 'INIT_APP':
            state = {
                ...state,
                _id: action.payload,
            };
            break;
        default:
    }
    return state;
};

export default userReducer;
