import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("turbo_progress_bar_show")

describe("turbo_progress_bar_show", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("defaults to 0", async () => {
    const progressBar = { show: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_show"></turbo-stream>`)

    assert.equal(progressBar.show.callCount, 1)
    assert.deepEqual(progressBar.show.args[0], [])
  })
})
