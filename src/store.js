import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import chat  from "./reducers/chatReducer"
import thunk from "redux-thunk"
import user from "./reducers/userReducer"
import promiseMiddleware  from "redux-promise"

export default createStore(
    combineReducers({
        chat,
        user
    }),
    {},
    applyMiddleware(logger, thunk, promiseMiddleware));
