var path = require('path');
var resolve = path.resolve;
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  var isProduction = false;

  if (env && env.production) {
    isProduction = true;
  }

  return {
    entry: [
      ...isProduction ? [] : [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
      ],

      './index.js'
      // the entry point of our app
    ],
    output: {
      filename: 'index.js',
      // the output bundle

      path: resolve(__dirname, 'lib'),

      publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, isProduction ? 'src' : 'test'),

    devtool: 'inline-source-map',

    devServer: {
      hot: !isProduction,
      // enable HMR on the server

      contentBase: resolve(__dirname, 'lib'),
      // match the output path

      publicPath: '/'
      // match the output `publicPath`
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        },
      ],
    },

    plugins: [
      ...isProduction ? [] : [
        new HtmlWebpackPlugin({
          template: 'index.html',
          title: 'Nilssongames Snake'
        }),

        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin()
        // prints more readable module names in the browser console on HMR updates
      ]
    ],
  };
};
