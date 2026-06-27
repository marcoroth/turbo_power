import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("prevent_unload")
registerAction("allow_unload")

function dispatchBeforeUnload() {
  const event = new Event("beforeunload", { cancelable: true })
  window.dispatchEvent(event)
  return event
}

describe("before_unload", () => {
  afterEach(async () => {
    // always disarm so an armed guard never leaks into other tests
    await executeStream('<turbo-stream action="allow_unload"></turbo-stream>')
  })

  context("prevent_unload", () => {
    it("arms the beforeunload guard", async () => {
      await executeStream('<turbo-stream action="prevent_unload"></turbo-stream>')

      const event = dispatchBeforeUnload()

      assert.isTrue(event.defaultPrevented)
    })
  })

  context("allow_unload", () => {
    it("disarms the beforeunload guard", async () => {
      await executeStream('<turbo-stream action="prevent_unload"></turbo-stream>')
      await executeStream('<turbo-stream action="allow_unload"></turbo-stream>')

      const event = dispatchBeforeUnload()

      assert.isFalse(event.defaultPrevented)
    })

    it("fully removes the guard even after repeated prevent_unload", async () => {
      await executeStream('<turbo-stream action="prevent_unload"></turbo-stream>')
      await executeStream('<turbo-stream action="prevent_unload"></turbo-stream>')
      await executeStream('<turbo-stream action="allow_unload"></turbo-stream>')

      const event = dispatchBeforeUnload()

      assert.isFalse(event.defaultPrevented)
    })
  })
})
