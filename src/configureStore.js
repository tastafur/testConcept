import {createStore, applyMiddleware, compose} from 'redux';

import createSagaMiddleware from 'redux-saga';

import Reactotron from '../ReactotronConfig.js';

import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMonitor = Reactotron.createSagaMonitor();

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const composeEnhancers = __DEV__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  Reactotron.createEnhancer(),
);

export const configureStore = () => {
  const store = createStore(rootReducer, enhancer);

  sagaMiddleware.run(rootSagas);

  return {store};
};
