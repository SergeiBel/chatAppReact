import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import socket from "./reducers/socketReducer"
import thunk from "redux-thunk"

export default createStore(
    combineReducers({
        socket
    }),
    {},
    applyMiddleware(logger, thunk));
