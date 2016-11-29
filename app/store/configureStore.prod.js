import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { persistStore, autoRehydrate } from 'redux-persist'
import analytics from 'redux-analytics';
import { track } from '../utils/Analytics';

const analyticsMiddleware = analytics((payload) => track(payload.type))
const configureStore = storage => {

  const store = compose(autoRehydrate(), applyMiddleware(
    thunk,
    analyticsMiddleware
  ))(createStore)(rootReducer);

  persistStore(store, { storage: storage })

  return store
}

export default configureStore
