import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("redirect_to")

describe("redirect_to", () => {
  beforeEach(() => {
    window.TurboPowerLocation = {
      assign: sinon.stub(),
    }
  })

  afterEach(() => {
    sinon.restore()
    window.TurboPowerLocation = undefined
  })

  context("turbo attribute", () => {
    it("doesn't use Turbo by default", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080"></turbo-stream>`)

      assert.equal(Turbo.visit.callCount, 0)
      assert.equal(TurboPowerLocation.assign.callCount, 1)
    })

    it("uses Turbo if true", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="true"></turbo-stream>`)

      const expected = ["http://localhost:8080", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("doesn't use Turbo if false", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="false"></turbo-stream>`
      )

      assert.equal(Turbo.visit.callCount, 0)
      assert.equal(TurboPowerLocation.assign.callCount, 1)
    })
  })

  context("turbo_action attribute", () => {
    it("uses advance by default", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="true"></turbo-stream>`)

      const expected = ["http://localhost:8080", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses replace", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="redirect_to" url="http://localhost:8080" turbo-action="replace" turbo="true"></turbo-stream>`
      )

      const expected = ["http://localhost:8080", { action: "replace" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses restore", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(
        `<turbo-stream action="redirect_to" url="http://localhost:8080" turbo-action="restore" turbo="true"></turbo-stream>`
      )

      const expected = ["http://localhost:8080", { action: "restore" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })
  })

  context("url attribute", () => {
    it("uses / as fallback", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" turbo="true"></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses / as fallback with url attribute without value", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url turbo="true"></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses / as fallback with empty url attribute", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="" turbo="true"></turbo-stream>`)

      const expected = ["/", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })

    it("uses the provided url value", async () => {
      sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="/path/to/somewhere" turbo="true"></turbo-stream>`)

      const expected = ["/path/to/somewhere", { action: "advance" }]

      assert.equal(Turbo.visit.callCount, 1)
      assert.deepEqual(Turbo.visit.args[0], expected)
    })
  })
})
