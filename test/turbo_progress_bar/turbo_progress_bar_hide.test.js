import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("turbo_progress_bar_hide")

describe("turbo_progress_bar_hide", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("defaults to 0", async () => {
    const progressBar = { hide: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_hide"></turbo-stream>`)

    assert.equal(progressBar.hide.callCount, 1)
    assert.deepEqual(progressBar.hide.args[0], [])
  })
})
