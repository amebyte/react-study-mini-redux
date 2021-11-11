import {applyMiddleware, combineReducers, createStore} from "redux";
// import {createStore, applyMiddleware} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-promise";
import isPromise from "is-promise";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}
// store.getState()
// 子state key value
// {user:{}, prroduct:{}}

// 创建一个数据仓库
const store = createStore(
  // countReducer,
  combineReducers({count: countReducer}),
  applyMiddleware(promise, thunk, logger)
);

export default store;

// 中间件logger
function logger({dispatch, getState}) {
  return (next) => (action) => {
    console.log("logger next", next); //sy-log
    console.log("---------------------------------"); //sy-log
    console.log(action.type + "执行啦"); //sy-log
    const prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);
    const nextState = getState();

    console.log("next state", nextState); //sy-log
    console.log("---------------------------------"); //sy-log
    return returnValue;
  };
}

// thunk 判断action，如果是函数，就执行函数
function thunk({dispatch, getState}) {
  return (next) => (action) => {
    console.log("thunk next", next); //sy-log

    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function promise({dispatch, getState}) {
  return (next) => (action) => {
    if (isPromise(action)) {
      return action.then(dispatch);
    }
    return next(action);
  };
}
