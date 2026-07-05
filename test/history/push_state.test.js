import sinon from "sinon"
import * as Turbo from "@hotwired/turbo"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("push_state")

describe("push_state", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("pushes the url onto Turbo's history", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "push", sinon.fake())

    await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state"></turbo-stream>`)

    assert.equal(fake.callCount, 1)
    assert.instanceOf(fake.firstArg, URL)
    assert.equal(fake.firstArg.href, `${window.location.origin}/new-state`)
  })

  it("resolves a relative url against the document base", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "push", sinon.fake())

    await executeStream(`<turbo-stream action="push_state" url="/relative"></turbo-stream>`)

    assert.equal(fake.callCount, 1)
    assert.instanceOf(fake.firstArg, URL)
    assert.equal(fake.firstArg.href, `${window.location.origin}/relative`)
  })

  it("ignores the legacy state and title attributes", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "push", sinon.fake())

    await executeStream(
      `<turbo-stream action="push_state" url="${window.location.origin}/x" state="ignored" title="ignored"></turbo-stream>`,
    )

    assert.equal(fake.callCount, 1)
    assert.instanceOf(fake.firstArg, URL)
    assert.equal(fake.firstArg.href, `${window.location.origin}/x`)
    assert.equal(fake.firstCall.args.length, 1)
  })

  it("does nothing when url is missing", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "push", sinon.fake())

    await executeStream(`<turbo-stream action="push_state"></turbo-stream>`)

    assert.equal(fake.callCount, 0)
  })

  it("does nothing when url is empty", async () => {
    const fake = sinon.replace(Turbo.navigator.history, "push", sinon.fake())

    await executeStream(`<turbo-stream action="push_state" url=""></turbo-stream>`)

    assert.equal(fake.callCount, 0)
  })
})
