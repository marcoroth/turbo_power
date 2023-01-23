import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("set_cookie")

function documentCookieFake() {
  return sinon.replaceSetter(document, "cookie", sinon.fake())
}

describe("set_cookie", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("should set the cookie", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie"
        cookie="foo=bar"></turbo-stream>`
    )

    assert.equal(fake.firstArg, "foo=bar")
    assert.equal(fake.callCount, 1)
  })

  it("should set the cookie even with invalid values", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie"
        cookie="foo=bar; whatever;"></turbo-stream>`
    )

    assert.equal(fake.firstArg, "foo=bar; whatever;")
    assert.equal(fake.callCount, 1)
  })
})
