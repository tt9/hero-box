/* eslint-env node */
const commonConfig = require('./webpack.common')
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge')

module.exports = merge( commonConfig,  {
  
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new DefinePlugin({
      __DEBUG_MODE__: process.env.DEBUG
    })
  ]
})

