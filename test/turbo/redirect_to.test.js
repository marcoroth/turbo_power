import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("redirect_to")

describe("redirect_to", () => {
  afterEach(() => {
    sinon.restore()
  })

  context("turbo attribute", () => {
    it("doesn't use Turbo by default", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080"></turbo-stream>`)

      assert.deepEqual(0, turbo.visit.callCount)
    })

    it("uses Turbo by if true", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="true"></turbo-stream>`)

      const expected = ['http://localhost:8080', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("doesn't use Turbo if false", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="false"></turbo-stream>`)

      assert.deepEqual(0, turbo.visit.callCount)
    })
  })

  context("turbo_action attribute", () => {
    it("uses advance by default", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo="true"></turbo-stream>`)

      const expected = ['http://localhost:8080', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("uses replace", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo-action="replace" turbo="true"></turbo-stream>`)

      const expected = ['http://localhost:8080', { action: 'replace' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("uses restore", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="http://localhost:8080" turbo-action="restore" turbo="true"></turbo-stream>`)

      const expected = ['http://localhost:8080', { action: 'restore' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })
  })

  context("url attribute", () => {
    it("uses / as fallback", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" turbo="true"></turbo-stream>`)

      const expected = ['/', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("uses / as fallback with url attribute without value", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url turbo="true"></turbo-stream>`)

      const expected = ['/', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("uses / as fallback with empty url attribute", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="" turbo="true"></turbo-stream>`)

      const expected = ['/', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })

    it("uses the provided url value", async () => {
      const turbo = sinon.replace(window, "Turbo", { visit: sinon.fake() })

      await executeStream(`<turbo-stream action="redirect_to" url="/path/to/somewhere" turbo="true"></turbo-stream>`)

      const expected = ['/path/to/somewhere', { action: 'advance' }]

      assert.deepEqual(1, turbo.visit.callCount)
      assert.deepEqual(expected, turbo.visit.args[0])
    })
  })
})
