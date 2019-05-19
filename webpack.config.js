var path = require('path');
var webpack = require('webpack');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    './index',
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'favicon.ico', to: 'images/favicon.ico' }]),
    new WebpackBuildNotifierPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: __dirname,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'raw-loader',
        ],
        include: __dirname,
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loaders: ['url-loader?limit=8000&name=images/[hash]-[name].[ext]'],
      },
    ],
  },
};
