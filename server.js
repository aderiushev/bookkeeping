var express = require('express');
var logger = require('morgan');
var bodyParser = require("body-parser");

var app = new express();
var port = 8080;

if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('./webpack.config.js');

    var compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
    app.use(logger('common'));
 }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

var cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('bookkeeping.db');
var routes = require('./server/routes')(app, db);

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
