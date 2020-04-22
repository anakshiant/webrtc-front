import thunk from "redux-thunk";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import homeReducer from "./Home/Reducer/HomeReducer";

let composeEnhancers = compose;
let preloadedState = {};

function createReducer(asyncReducer) {
  return combineReducers({
    homeReducer
  });
}
let emptyCloneStore = createStore(
  createReducer(),
  preloadedState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({})))
);

export default emptyCloneStore;
