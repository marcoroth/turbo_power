import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("turbo_visit")

describe("turbo_visit", () => {
  afterEach(() => {
    sinon.restore()
  })

  context("location attribute", () => {
    it("visits the provided location", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="turbo_visit" location="/path/to/somewhere"></turbo-stream>`)

      const expected = ["/path/to/somewhere", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses / as fallback", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="turbo_visit"></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses / as fallback with empty location attribute", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="turbo_visit" location=""></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses / as fallback with location attribute without value", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="turbo_visit" location></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })
  })

  context("turbo_action attribute", () => {
    it("uses advance by default", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="turbo_visit" location="/somewhere"></turbo-stream>`)

      assert.deepEqual(Turbo.visit.args[0], ["/somewhere", { action: "advance" }])
    })

    it("uses replace", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="turbo_visit" location="/somewhere" turbo-action="replace"></turbo-stream>`,
      )

      assert.deepEqual(Turbo.visit.args[0], ["/somewhere", { action: "replace" }])
    })

    it("uses restore", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="turbo_visit" location="/somewhere" turbo-action="restore"></turbo-stream>`,
      )

      assert.deepEqual(Turbo.visit.args[0], ["/somewhere", { action: "restore" }])
    })
  })

  context("turbo_frame attribute", () => {
    it("passes the frame option", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="turbo_visit" location="/somewhere" turbo-frame="modals"></turbo-stream>`,
      )

      assert.deepEqual(Turbo.visit.args[0], ["/somewhere", { action: "advance", frame: "modals" }])
    })
  })
})
