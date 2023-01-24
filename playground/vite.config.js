import { viteMockServe } from "vite-plugin-mock"
import path from "path"

export default {
  resolve: {
    alias: {
      turbo_power: path.resolve(__dirname, "../dist/index"),
    },
  },
  plugins: [
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
  ],
}
