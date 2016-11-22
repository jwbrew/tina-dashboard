import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import { persistStore, autoRehydrate } from 'redux-persist'

const configureStore = storage => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = compose(autoRehydrate(), applyMiddleware(
    thunk,
    createLogger()
  ))(createStore)(rootReducer);

  persistStore(store, { storage: storage })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
