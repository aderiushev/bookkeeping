import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import consumptions from './reducers/consupmptions';
import categories from './reducers/categories';
import budget from './reducers/budget';
import reports from './reducers/reports';
import moneyLeft from './reducers/moneyLeft';

import App from './containers/App';
import Reports from './containers/Reports';
import Consumptions from './containers/Consumptions';
import Categories from './containers/Categories';

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger()];

const history = createBrowserHistory();

const reducers = combineReducers({
  consumptions,
  categories,
  budget,
  reports,
  moneyLeft,
  router: connectRouter(history),
});

const store = createStore(reducers, applyMiddleware(...middleware));


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route path="/" component={Consumptions} />
          <Route path="/reports" component={Reports} />
          <Route path="/categories" component={Categories} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
