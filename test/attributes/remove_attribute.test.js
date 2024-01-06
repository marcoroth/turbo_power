import sinon from "sinon"
import { html, fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("remove_attribute")

describe("remove_attribute", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })

    it("should do nothing and print warning if attribute is empty", async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "remove_attribute"'

      await fixture('<div id="element"></div>')

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="remove_attribute" attribute="" target="element"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "remove_attribute"'

      await fixture('<div id="element"></div>')

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="remove_attribute" target="element"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })
  })

  context("target", () => {
    it("should remove attribute", async () => {
      await fixture(html`<div id="element" my-attribute="previous-value"></div>`)

      assert.equal(document.querySelector("#element").getAttribute("my-attribute"), "previous-value")

      await executeStream(
        '<turbo-stream action="remove_attribute" attribute="my-attribute" target="element"></turbo-stream>',
      )

      assert.equal(document.querySelector("#element").getAttribute("my-attribute"), null)
    })
  })

  context("targets", () => {
    it("should remove attribute", async () => {
      await fixture(html`
        <div id="element1" my-attribute="previous-value"></div>
        <div id="element2" my-attribute="previous-value"></div>
        <div id="element3" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector("#element1").getAttribute("my-attribute"), "previous-value")
      assert.equal(document.querySelector("#element2").getAttribute("my-attribute"), "previous-value")
      assert.equal(document.querySelector("#element3").getAttribute("my-attribute"), "previous-value")

      await executeStream(
        '<turbo-stream action="remove_attribute" attribute="my-attribute" value="my-value" targets="div"></turbo-stream>',
      )

      assert.equal(document.querySelector("#element1").getAttribute("my-attribute"), null)
      assert.equal(document.querySelector("#element2").getAttribute("my-attribute"), null)
      assert.equal(document.querySelector("#element3").getAttribute("my-attribute"), null)
    })
  })
})
