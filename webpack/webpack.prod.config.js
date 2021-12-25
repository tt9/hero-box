
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      __DEBUG_MODE__: false
    })
  ]
})
