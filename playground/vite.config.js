import { viteMockServe } from 'vite-plugin-mock'
const path = require('path')

export default {
  resolve: {
    alias: {
      turbo_power: path.resolve(__dirname, '../dist/index')
    }
  },
  plugins: [
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    })
  ]
}
