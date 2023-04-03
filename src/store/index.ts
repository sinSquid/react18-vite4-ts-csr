import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../reducers/index'

export default function (...args: any[]) {
  const [ctx, ...rest] = args
  const middlewares = [thunk]
  return compose(composeWithDevTools(applyMiddleware(...middlewares)))(createStore)(reducers, ...rest)
}
