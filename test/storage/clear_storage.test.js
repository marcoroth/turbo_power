import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("clear_storage")

describe("clear_storage", () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  context("localStorage", () => {
    it("should clear localStorage with not defined type", async () => {
      localStorage.setItem("key10", "value1")
      localStorage.setItem("key20", "value2")
      sessionStorage.setItem("key30", "value3")

      assert.equal(localStorage.getItem("key10"), "value1")
      assert.equal(localStorage.getItem("key20"), "value2")
      assert.equal(sessionStorage.getItem("key30"), "value3")

      await executeStream('<turbo-stream action="clear_storage"></turbo-stream>')

      assert.equal(localStorage.getItem("key10"), null)
      assert.equal(localStorage.getItem("key20"), null)
      assert.equal(sessionStorage.getItem("key30"), "value3")
    })

    it('should clear localStorage with empty "type" attribute', async () => {
      localStorage.setItem("key11", "value1")
      localStorage.setItem("key22", "value2")
      sessionStorage.setItem("key33", "value3")

      assert.equal(localStorage.getItem("key11"), "value1")
      assert.equal(localStorage.getItem("key22"), "value2")
      assert.equal(sessionStorage.getItem("key33"), "value3")

      await executeStream('<turbo-stream action="clear_storage" type=""></turbo-stream>')

      assert.equal(localStorage.getItem("key11"), null)
      assert.equal(localStorage.getItem("key22"), null)
      assert.equal(sessionStorage.getItem("key33"), "value3")
    })

    it('should clear localStorage with "type=local"', async () => {
      localStorage.setItem("key12", "value1")
      localStorage.setItem("key22", "value2")
      sessionStorage.setItem("key32", "value3")

      assert.equal(localStorage.getItem("key12"), "value1")
      assert.equal(localStorage.getItem("key22"), "value2")
      assert.equal(sessionStorage.getItem("key32"), "value3")

      await executeStream('<turbo-stream action="clear_storage" type="local"></turbo-stream>')

      assert.equal(localStorage.getItem("key12"), null)
      assert.equal(localStorage.getItem("key22"), null)
      assert.equal(sessionStorage.getItem("key32"), "value3")
    })
  })

  context("sessionStorage", () => {
    it('should clear sessionStorage with "type=session"', async () => {
      sessionStorage.setItem("key13", "value1")
      sessionStorage.setItem("key23", "value2")
      localStorage.setItem("key33", "value3")

      assert.equal(sessionStorage.getItem("key13"), "value1")
      assert.equal(sessionStorage.getItem("key23"), "value2")
      assert.equal(localStorage.getItem("key33"), "value3")

      await executeStream('<turbo-stream action="clear_storage" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem("key13"), null)
      assert.equal(sessionStorage.getItem("key23"), null)
      assert.equal(localStorage.getItem("key33"), "value3")
    })
  })
})
