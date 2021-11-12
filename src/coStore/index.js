// import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {createStore, applyMiddleware} from "../coRedux/";

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

// 创建一个数据仓库
const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;