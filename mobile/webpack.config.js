
const htmlPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

const plugins = [
  new webpack.ProgressPlugin(),
  new htmlPlugin({
    title: 'HopeBox Mobile Simulator',
    filename: 'index.html',
    template: path.join(__dirname, 'src', 'template.html'),
    inject: 'body',
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
    minify: PROD,
    hash: true,
    xhtml: true,
  }),
]

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8080,
  },
  devtool: PROD ? false : 'inline-source-map',
  entry: ['whatwg-fetch', path.join(__dirname, 'src', 'index.js')],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
