import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import api from '../middleware/api'
import rootReducer from '../reducers'
import analytics from 'redux-analytics';
import { track } from '../utils/Analytics';

const analyticsMiddleware = analytics((payload) => track(payload.type))

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, analyticsMiddleware)
)

export default configureStore
