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
let store = createStore(
  createReducer(),
  preloadedState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({})))
);
export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers = store.asyncReducers ? store.asyncReducers : {};

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
export default store;
