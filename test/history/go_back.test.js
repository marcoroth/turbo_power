import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("history_back")

describe("history_back", () => {
  afterEach(() => {
    sinon.restore()
  })
  it("should go back in history", async () => {
    sinon.replace(window.history, "back", sinon.fake())

    await executeStream(`<turbo-stream action="history_back"></turbo-stream>`)

    assert(window.history.back.called)
  })
})
