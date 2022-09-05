const path = require('path')

export default {
  resolve: {
    alias: {
      turbo_power: path.resolve(__dirname, '../dist/index.js')
    }
  }
}
