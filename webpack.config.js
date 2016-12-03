var path = require('path'),
    webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      text: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      text: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
}
