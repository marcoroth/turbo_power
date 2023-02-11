import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("turbo_progress_bar_set_value")

describe("turbo_progress_bar_set_value", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("defaults to 0", async () => {
    const progressBar = { setValue: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_set_value"></turbo-stream>`)

    assert.equal(progressBar.setValue.callCount, 1)
    assert.deepEqual(progressBar.setValue.args[0], [0])
  })

  it("works with zero value", async () => {
    const progressBar = { setValue: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_set_value" value="0"></turbo-stream>`)

    assert.equal(progressBar.setValue.callCount, 1)
    assert.deepEqual(progressBar.setValue.args[0], [0])
  })

  it("works with integer values", async () => {
    const progressBar = { setValue: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_set_value" value="100"></turbo-stream>`)

    assert.equal(progressBar.setValue.callCount, 1)
    assert.deepEqual(progressBar.setValue.args[0], [100])
  })

  it("works with float values", async () => {
    const progressBar = { setValue: sinon.fake() }
    sinon.replace(window, "Turbo", { navigator: { adapter: { progressBar } } })

    await executeStream(`<turbo-stream action="turbo_progress_bar_set_value" value="0.5"></turbo-stream>`)

    assert.equal(progressBar.setValue.callCount, 1)
    assert.deepEqual(progressBar.setValue.args[0], [0.5])
  })
})
