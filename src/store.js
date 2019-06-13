import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import user from "./reducers/userReducer"
import math from "./reducers/mathReducer"
import socket from "./reducers/socketReducer"

export default createStore(
    combineReducers({
        user,
        math,
        socket
    }),
    {},
    applyMiddleware(logger));
