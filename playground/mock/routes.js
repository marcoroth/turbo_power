export default [
  {
    url: /\/turbo-frame-[\d]/,
    method: "get",
    rawResponse: async (req, res) => {
      // let _reqbody = ""
      await new Promise((resolve) => {
        req.on("data", (_chunk) => {
          // _reqbody += _chunk
        })
        req.on("end", () => resolve(undefined))
      })
      res.setHeader("Content-Type", "text/html")
      res.statusCode = 200
      res.end(`<turbo-frame id='dynamic-frame'>Dynamic Turbo Frame <strong>${res.req.url}</strong></turbo-frame>`)
    },
  },
  {
    url: /\/turbo-stream-[\w+]/,
    method: "get",
    rawResponse: async (req, res) => {
      // let _reqbody = ""
      await new Promise((resolve) => {
        req.on("data", (_chunk) => {
          // _reqbody += _chunk
        })
        req.on("end", () => resolve(undefined))
      })
      const kindValue = res.req.url.split("turbo-stream-")[1]
      res.setHeader("Content-Type", "text/vnd.turbo-stream.html; charset=utf-8")
      res.statusCode = 200
      const htmlResponse = (kind) =>
        ({
          frame_src:
            '<turbo-stream action="turbo_frame_set_src" src="turbo-frame-3" target="dynamic-frame"></turbo-stream>',
          frame_reload: '<turbo-stream action="turbo_frame_reload" target="static-frame"></turbo-stream>',
          inner_html:
            '<turbo-stream action="inner_html" targets="#static-frame"><template><h1>INNER HTML action</template></turbo-stream>',
        }[kind])
      res.end(htmlResponse(kindValue))
    },
  },
]
