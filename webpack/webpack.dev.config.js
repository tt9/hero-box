/* eslint-env node */
const commonConfig = require('./webpack.common')


module.exports = {
  ...commonConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
}
