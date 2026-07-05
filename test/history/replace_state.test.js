import sinon from "sinon"
import * as Turbo from "@hotwired/turbo"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("replace_state")

describe("replace_state", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("replaces the current entry in Turbo's history", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "replace", sinon.fake())

    await executeStream(`<turbo-stream action="replace_state" url="${window.location.origin}/replaced"></turbo-stream>`)

    assert.equal(fake.callCount, 1)
    assert.instanceOf(fake.firstArg, URL)
    assert.equal(fake.firstArg.href, `${window.location.origin}/replaced`)
  })

  it("resolves a relative url against the document base", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "replace", sinon.fake())

    await executeStream(`<turbo-stream action="replace_state" url="/relative"></turbo-stream>`)

    assert.equal(fake.callCount, 1)
    assert.instanceOf(fake.firstArg, URL)
    assert.equal(fake.firstArg.href, `${window.location.origin}/relative`)
  })

  it("does nothing when url is missing", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "replace", sinon.fake())

    await executeStream(`<turbo-stream action="replace_state"></turbo-stream>`)

    assert.equal(fake.callCount, 0)
  })

  it("does nothing when url is empty", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "replace", sinon.fake())

    await executeStream(`<turbo-stream action="replace_state" url=""></turbo-stream>`)

    assert.equal(fake.callCount, 0)
  })
})
