const env = process.env.NODE_ENV || 'dev'
console.log(`Build env: ${env}`)

const config = require(`./webpack/webpack.${env}.config`)

module.exports = config