import sinon from "sinon"
import { fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("replace_css_class")

describe("replace_css_class", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if no "from" were provided', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning =
        '[TurboPower] no "from" or "to" class provided for Turbo Streams operation "replace_css_class"'

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="replace_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })

    it('should do nothing and print warning if "from" attribute is missing', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning =
        '[TurboPower] no "from" or "to" class provided for Turbo Streams operation "replace_css_class"'

      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="replace_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("class"), null)
      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })

    it('should do nothing if "from" attribute is not present on element', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())

      const element = await fixture('<div id="element" class=""></div>')

      assert.equal(element.getAttribute("class"), "")
      assert.equal(fake.callCount, 0)

      await executeStream(
        '<turbo-stream action="replace_css_class" target="element" from="one" to="two"></turbo-stream>',
      )

      assert.equal(element.getAttribute("class"), "")
      assert.equal(fake.callCount, 1)
      assert.equal(
        fake.firstArg,
        `[TurboPower] The "one" CSS class provided in the "from" attribute for the "replace_css_class" action was not found on the target element. No replacements made.`,
      )
      assert.equal(fake.lastArg, element)
    })
  })

  context("target", () => {
    it("should replace the css class", async () => {
      const element = await fixture('<div id="element" class="background-blue"></div>')

      assert.equal(element.getAttribute("class"), "background-blue")

      await executeStream(
        '<turbo-stream action="replace_css_class" from="background-blue" to="background-red" target="element"></turbo-stream>',
      )

      assert.equal(element.getAttribute("class"), "background-red")
    })
  })

  context("targets", () => {
    it("should replace the css class", async () => {
      await fixture(`
        <div id="one" class="background-blue"></div>
        <div id="two" class="background-blue"></div>
        <div id="three" class="background-blue"></div>
      `)

      assert.equal(document.querySelector("#one").getAttribute("class"), "background-blue")
      assert.equal(document.querySelector("#two").getAttribute("class"), "background-blue")
      assert.equal(document.querySelector("#three").getAttribute("class"), "background-blue")

      await executeStream(
        '<turbo-stream action="replace_css_class" from="background-blue" to="background-red" targets="#one, #two, #three"></turbo-stream>',
      )

      assert.equal(document.querySelector("#one").getAttribute("class"), "background-red")
      assert.equal(document.querySelector("#two").getAttribute("class"), "background-red")
      assert.equal(document.querySelector("#three").getAttribute("class"), "background-red")
    })
  })
})
