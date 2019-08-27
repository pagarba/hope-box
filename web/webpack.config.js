
const htmlPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000
  },
  devtool: PROD ? 'none' : 'source-map',
  entry: [path.join(__dirname, 'src', 'index.js')],
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {importLoaders: 1, url: false}},
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new htmlPlugin({
      title: 'HopeBox - Command Center',
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'template.html'),
      inject: 'body',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      hash: true,
      xhtml: true
    }),
  ],
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx']
  },
  target: 'web'
}
