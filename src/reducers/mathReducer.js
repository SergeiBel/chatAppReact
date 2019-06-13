const mathReducer = (state = {
    count: 1,
}, action) => {
    switch(action.type){
        case 'ADD':
            console.log(1);
            state = {
                ...state,
                count: state.count + action.payload
            }
            ;
            break;
        case 'SUBTRACT':
            state = {
                ...state,
                count: state.count - action.payload
            };
            break;
        default:
    }
    return state;
};

export default mathReducer;
