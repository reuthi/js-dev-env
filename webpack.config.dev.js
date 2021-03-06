const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const WebpackNodeServerPlugin = require('webpack-node-server-plugin')

let nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

let plugins
if(process.env.NODE === 'production'){
  plugins = [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
}else{
  plugins = [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new WebpackNodeServerPlugin({retries: 0}),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
}

module.exports = {
	debug: true,
  devtool: 'source-map',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules:false}]]
        }
      }
    ]
  }
}
