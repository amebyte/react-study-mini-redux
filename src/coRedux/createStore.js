export default function createStore(reducer) {
    let currentState
    let currentListeners = []
    function getState() {
        return currentState
    }

    function  dispatch(action) {console.log('dispatch')
        currentState = reducer(currentState, action)
        currentListeners.map((listener) => listener())
    }

    function subscribe(listener) {
        currentListeners.push(listener)
        return () => {
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
        }
    }

    dispatch({ type: 'gfhcodskfl354'})

    return {
        getState,
        dispatch,
        subscribe
    }
}