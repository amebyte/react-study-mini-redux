export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch

        // todo 加强dispatch
        // 把中间件写成 wrapper function
        // 给中间件函数传参 getState dispatch

        const midAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action) 
        }

        // 把store的控制权(midAPI)给中间件
        const chain = middlewares.map((middleware) => middleware(midAPI))

        // 执行一次dispatch，就要执行所有的中间函数，并且最后还要执行store.dispatch
        dispatch = compose(...chain)(store.dispatch)

        return {...store, dispatch}
    }
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