import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { debounce } from 'lodash';
import * as reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const serialisedState = localStorage.getItem('reduxState');
const preloadedState = serialisedState ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
  combineReducers({ ...reducers }),
  preloadedState,
  composeEnhancer(applyMiddleware(thunk)),
);

store.subscribe(
  debounce(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  }, 1000),
);

export { store as default };
