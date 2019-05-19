const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const config = require('./webpack.config.js');

const app = new express();
const port = 8080;

if (process.env.NODE_ENV === 'development') {
  app.use(logger('common'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bookkeeping.sqlite3');
require('./server/routes')(app, db);


app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
