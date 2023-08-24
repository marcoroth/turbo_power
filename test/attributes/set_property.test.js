import sinon from "sinon"
import { fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("set_property")

describe("set_property", () => {
  context("errors", () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if "name" attribute is empty', async () => {
      sinon.replace(console, "error", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedError = '[TurboPower] no "name" provided for Turbo Streams operation "set_property"'

      assert(!console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

      await executeStream('<turbo-stream action="set_property" name="" target="element" value=""></turbo-stream>')

      assert(console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)
    })

    it('should do nothing and print warning if "name" attribute is missing', async () => {
      sinon.replace(console, "error", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedError = '[TurboPower] no "name" provided for Turbo Streams operation "set_property"'

      assert(!console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

      await executeStream('<turbo-stream action="set_property" target="element"></turbo-stream>')

      assert(console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)
    })
  })

  context("application", () => {
    it("should check a checkbox and then uncheck it", async () => {
      await fixture('<input id="element" type="checkbox" />')

      assert.equal(document.querySelector("#element").checked, false)

      await executeStream(
        '<turbo-stream action="set_property" target="element" name="checked" value="true"></turbo-stream>',
      )

      assert.equal(document.querySelector("#element").checked, true)

      await executeStream(
        '<turbo-stream action="set_property" target="element" name="checked" value="false"></turbo-stream>',
      )

      assert.equal(document.querySelector("#element").checked, false)
    })

    it("should set the title and then blank it out", async () => {
      await fixture('<a id="element" href="">link</a>')

      assert.equal(document.querySelector("#element").title, "")

      const value = "test title for an A tag"
      await executeStream(
        `<turbo-stream action="set_property" target="element" name="title" value="${value}"></turbo-stream>`,
      )

      assert.equal(document.querySelector("#element").title, value)

      await executeStream('<turbo-stream action="set_property" target="element" name="title" value=""></turbo-stream>')

      assert.equal(document.querySelector("#element").title, "")
    })
  })
})
