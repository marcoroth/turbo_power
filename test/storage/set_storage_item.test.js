import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("set_storage_item")

describe("set_storage_item", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })

    it("should do nothing and print warning if attribute is empty", async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "set_storage_item"'

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="set_storage_item" key=""></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "set_storage_item"'

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="set_storage_item"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })
  })

  context("localStorage", () => {
    it("should set local storage item with value", async () => {
      assert.equal(localStorage.getItem("key1"), null)
      assert.equal(sessionStorage.getItem("key1"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value="value1"></turbo-stream>')

      assert.equal(localStorage.getItem("key1"), "value1")
      assert.equal(sessionStorage.getItem("key1"), null)
    })

    it('should set local storage item with value and "type=local"', async () => {
      assert.equal(localStorage.getItem("key2"), null)
      assert.equal(sessionStorage.getItem("key2"), null)

      await executeStream(
        '<turbo-stream action="set_storage_item" key="key2" value="value2" type="local"></turbo-stream>',
      )

      assert.equal(localStorage.getItem("key2"), "value2")
      assert.equal(sessionStorage.getItem("key2"), null)
    })

    it("should set local storage item with empty value", async () => {
      assert.equal(localStorage.getItem("key3"), null)
      assert.equal(sessionStorage.getItem("key3"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key3" value=""></turbo-stream>')

      assert.equal(localStorage.getItem("key3"), "")
      assert.equal(sessionStorage.getItem("key3"), null)
    })

    it("should override previous local storage item value with empty value", async () => {
      localStorage.setItem("key4", "value")

      assert.equal(localStorage.getItem("key4"), "value")
      assert.equal(sessionStorage.getItem("key4"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key4" value=""></turbo-stream>')

      assert.equal(localStorage.getItem("key4"), "")
      assert.equal(sessionStorage.getItem("key4"), null)
    })

    it('should override previous local storage item value with missing "value" attribute', async () => {
      localStorage.setItem("key5", "value")

      assert.equal(localStorage.getItem("key5"), "value")
      assert.equal(sessionStorage.getItem("key5"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key5"></turbo-stream>')

      assert.equal(localStorage.getItem("key5"), "")
      assert.equal(sessionStorage.getItem("key5"), null)
    })
  })

  context("sessionStorage", () => {
    it('should set session storage item with value and "type=session"', async () => {
      assert.equal(sessionStorage.getItem("key6"), null)
      assert.equal(localStorage.getItem("key6"), null)

      await executeStream(
        '<turbo-stream action="set_storage_item" key="key6" value="value6" type="session"></turbo-stream>',
      )

      assert.equal(sessionStorage.getItem("key6"), "value6")
      assert.equal(localStorage.getItem("key6"), null)
    })

    it("should set session storage item with empty value", async () => {
      assert.equal(sessionStorage.getItem("key7"), null)
      assert.equal(localStorage.getItem("key7"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key7" value=""  type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem("key7"), "")
      assert.equal(localStorage.getItem("key7"), null)
    })

    it("should override previous session storage item value with empty value", async () => {
      sessionStorage.setItem("key8", "value")

      assert.equal(sessionStorage.getItem("key8"), "value")
      assert.equal(localStorage.getItem("key8"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key8" value="" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem("key8"), "")
      assert.equal(localStorage.getItem("key8"), null)
    })

    it('should override previous session storage item value with missing "value" attribute', async () => {
      sessionStorage.setItem("key9", "value")

      assert.equal(sessionStorage.getItem("key9"), "value")
      assert.equal(localStorage.getItem("key9"), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key9" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem("key9"), "")
      assert.equal(localStorage.getItem("key9"), null)
    })
  })
})
