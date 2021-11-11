export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    // 最土的dispatch就是store.dispatch，接收的参数就是plain objects的action
    let dispatch = store.dispatch;

    // todo 加强dispatch
    // super dispatch
    // 执行一次dispatch 相当于 所有中间件函数依次执行和store.dispatch执行

    // midapi是访问状态管理库的工具对象
    const midapi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action),
    };
    // chain就是中间件函数的返回值数组，这个数组里每个函数都能访问到状态管理库
    // middleware 中间件函数式wrapper Function 闭包
    const chain = middlewares.map((middleware) => middleware(midapi));

    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch};
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
