import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("push_state")

describe("push_state", () => {
  afterEach(() => {
    sinon.restore()
  })

  context("all attributes", () => {
    it("should push item to history object", async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream(
        `<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state" title="title"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["state", "title", `${window.location.origin}/new-state`])
    })
  })

  context("title attribute", () => {
    it('should push item to history object with missing "title" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream(
        `<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["state", "", `${window.location.origin}/new-state`])
    })

    it('should push item to history object with missing empty "title" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream(
        `<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state" title=""></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["state", "", `${window.location.origin}/new-state`])
    })
  })

  context("state attribute", () => {
    it('should push item to history object with missing "state" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream(
        `<turbo-stream action="push_state" url="${window.location.origin}/new-state" title="title"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, [null, "title", `${window.location.origin}/new-state`])
    })

    it('should push item to history object with missing empty "state" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream(
        `<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="" title="title"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["", "title", `${window.location.origin}/new-state`])
    })
  })

  context("url attribute", () => {
    it('should push item to history object with missing "url" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream('<turbo-stream action="push_state" title="title" state="state"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["state", "title", null])
    })

    it('should push item to history object with missing empty "url" attribute', async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream('<turbo-stream action="push_state" url="" state="state" title="title"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["state", "title", ""])
    })
  })

  context("no attributes", () => {
    it("should push item to history object with no attributes", async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream('<turbo-stream action="push_state"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, [null, "", null])
    })

    it("should push item to history object with empty attributes", async () => {
      const fake = sinon.replace(window.history, "pushState", sinon.fake())

      await executeStream('<turbo-stream action="push_state" url="" state="" title=""></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstCall.args, ["", "", ""])
    })
  })
})
