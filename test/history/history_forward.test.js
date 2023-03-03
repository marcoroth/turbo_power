import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("history_forward")

describe("history_forward", () => {
  afterEach(() => {
    sinon.restore()
  })
  it("should go forward in history", async () => {
    sinon.replace(window.history, "forward", sinon.fake())

    await executeStream(`<turbo-stream action="history_forward"></turbo-stream>`)

    assert(window.history.forward.called)
  })
})
