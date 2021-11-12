export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = store.dispatch
        return {...store, dispatch}
    }
}