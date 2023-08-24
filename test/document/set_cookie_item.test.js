import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("set_cookie_item")

function documentCookieFake() {
  return sinon.replaceSetter(document, "cookie", sinon.fake())
}

describe("set_cookie_item", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("should set the key value pair", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar")
    assert.equal(fake.callCount, 1)
  })

  it("should set Domain", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        domain="example.com"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; Domain=example.com")
    assert.equal(fake.callCount, 1)
  })

  it("should set Path", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        path="/path"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; Path=/path")
    assert.equal(fake.callCount, 1)
  })

  it("should set Expires", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        expires="Thu, 31 Oct 2021 07:28:00 GMT"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; Expires=Thu, 31 Oct 2021 07:28:00 GMT")
    assert.equal(fake.callCount, 1)
  })

  it("should set Max-Age", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        max-age="75"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; Max-Age=75")
    assert.equal(fake.callCount, 1)
  })

  it("should set HTTPOnly", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        http-only></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; HttpOnly")
    assert.equal(fake.callCount, 1)
  })

  it("should set Secure", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        secure></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; Secure")
    assert.equal(fake.callCount, 1)
  })

  it("should set SameSite", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        same-site="strict"></turbo-stream>`,
    )

    assert.equal(fake.firstArg, "foo=bar; SameSite=strict")
    assert.equal(fake.callCount, 1)
  })

  it("should set everything", async () => {
    const fake = documentCookieFake()

    await executeStream(
      `<turbo-stream
        action="set_cookie_item"
        name="foo"
        value="bar"
        domain="example.com"
        path="/path"
        expires="Thu, 31 Oct 2021 07:28:00 GMT"
        max-age="15"
        http-only
        secure
        same-site="strict"
        ></turbo-stream>`,
    )

    assert.equal(
      fake.firstArg,
      "foo=bar; Domain=example.com; Path=/path; Expires=Thu, 31 Oct 2021 07:28:00 GMT; Max-Age=15; HttpOnly; Secure; SameSite=strict",
    )
    assert.equal(fake.callCount, 1)
  })
})
