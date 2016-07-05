import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import consumptions from './reducers/consupmptions'
import categories from './reducers/categories'
import budget from './reducers/budget'
import moneyLeft from './reducers/moneyLeft'

import App from './containers/App'
import Reports from './containers/Reports'
import Consumptions from './containers/Consumptions'
import Categories from './containers/Categories'
import Settings from './containers/Settings'

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const middleware = process.env.NODE_ENV === 'production' ? [] : [logger()];

const reducers = combineReducers({
    consumptions,
    categories,
    budget,
    moneyLeft,
    routing: routerReducer
});

const store = createStore(reducers, applyMiddleware(...middleware));

const history = syncHistoryWithStore(browserHistory, store);

render(
    (<Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Consumptions} />
                <Route path="reports-page" component={Reports}/>
                <Route path="categories-page" component={Categories}/>
                <Route path="settings-page" component={Settings}/>
            </Route>
        </Router>
    </Provider>),
    document.getElementById('root')
);
