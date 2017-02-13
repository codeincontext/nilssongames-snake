var path = require('path');
var resolve = path.resolve;

module.exports = {
  entry: [
    './index.js'
  ],

  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist')
  },

  context: resolve(__dirname, 'src'),

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ]
      }
    ]
  }
};
