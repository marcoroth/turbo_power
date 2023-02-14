import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import filesize from "rollup-plugin-filesize"
import { readFileSync } from "fs"

const json = JSON.parse(readFileSync("./package.json"))
const banner = `/*\n * TurboPower ${json.version}\n */`

const pretty = () => {
  return terser({
    mangle: false,
    compress: false,
    format: {
      comments: "all",
      beautify: true,
      indent_level: 2
    }
  })
}

export default [
  {
    input: "src/index.ts",
    external: ["@hotwired/turbo"],
    output: [
      {
        name: "TurboPower",
        file: "dist/turbo_power.umd.js",
        format: "umd",
        banner,
        globals: {
          "@hotwired/turbo": "Turbo",
        },
      },
      {
        file: "dist/turbo_power.js",
        format: "es",
        banner,
      },
    ],
    plugins: [
      resolve(),
      typescript(),
      pretty(),
      filesize(),
    ],
    watch: {
      include: "src/**",
    },
  },
]
