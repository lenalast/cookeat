import {applyMiddleware, combineReducers, createStore} from 'redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

const combinedReducers = combineReducers({
  ...reducers
})

const rootReducer = (state, action) => combinedReducers(state, action)

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export default store