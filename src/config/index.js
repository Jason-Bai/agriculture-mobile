if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config.production.js')
} else {
  module.exports = require('./config.development.js')
}
