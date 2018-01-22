var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    devtool: 'eval',
    entry: [
        './index'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'favicon.ico', to: 'images/favicon.ico' }]),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1']
                },
                exclude: /(node_modules|bower_components)/,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: __dirname
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                loaders: ['url-loader?limit=8000&name=images/[hash]-[name].[ext]']
            }        ]
    }
};

module.exports = config;