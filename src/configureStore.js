import { createStore, applyMiddleware, compose } from 'redux';

import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import createSagaMiddleware from 'redux-saga';

import Reactotron from '../ReactotronConfig.js';

import rootReducer from './reducers';
import rootSagas from './sagas';

import { AppNavigator } from './navigators/AppNavigator';
import { connect } from 'react-redux';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const sagaMonitor = Reactotron.createSagaMonitor()

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });


const composeEnhancers = __DEV__
  ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const enhancer = compose(
  applyMiddleware(navigationMiddleware, sagaMiddleware),
  Reactotron.createEnhancer()
);

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    enhancer
  );

  sagaMiddleware.run(rootSagas);

  return { store, AppWithNavigationState };
};
