import { createStore, applyMiddleware } from "redux";
import appReducer from "./reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(
    thunk
)));

export default store;
