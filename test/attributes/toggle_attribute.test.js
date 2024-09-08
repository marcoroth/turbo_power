import sinon from "sinon"
import { html, fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("toggle_attribute")

describe("toggle_attribute", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })

    it("should do nothing and print warning if attribute is empty", async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "toggle_attribute"'

      await fixture('<div id="element"></div>')

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="toggle_attribute" attribute="" target="element"></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      const fake = sinon.replace(console, "warn", sinon.fake())
      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "toggle_attribute"'

      await fixture('<div id="element"></div>')

      assert.equal(fake.callCount, 0)

      await executeStream('<turbo-stream action="toggle_attribute" target="element" ></turbo-stream>')

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, expectedWarning)
    })
  })

  context("target", () => {
    it("adds the attribute if not present", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      assert.isFalse(element.hasAttribute("my-attribute"))
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" target="element"></turbo-stream>',
      )
      assert.isTrue(element.hasAttribute("my-attribute"))
    })

    it("removes attribute if present", async () => {
      const element = await fixture(html`<div id="element" my-attribute></div>`)
      assert.isTrue(element.hasAttribute("my-attribute"))
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" target="element"></turbo-stream>',
      )
      assert.isFalse(element.hasAttribute("my-attribute"))
    })

    it("should act as add attribute if force=true", async () => {
      const element = await fixture(html`<div id="element" my-attribute></div>`)
      assert.isTrue(element.hasAttribute("my-attribute"))
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" force="true" target="element"></turbo-stream>',
      )
      assert.isTrue(element.hasAttribute("my-attribute"))
    })

    it("should act as remove attribute if force=false", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      assert.isFalse(element.hasAttribute("my-attribute"))
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" force="false" target="element"></turbo-stream>',
      )
      assert.isFalse(element.hasAttribute("my-attribute"))
    })
  })

  context("targets", () => {
    it("adds the attribute if not present", async () => {
      const container = await fixture(html`
        <div>
          <div id="element1"></div>
          <div id="element2"></div>
          <div id="element3"></div>
        </div>
      `)
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" targets="div > div"></turbo-stream>',
      )
      const elements = container.querySelectorAll("div")
      elements.forEach((element) => {
        assert.isTrue(element.hasAttribute("my-attribute"))
      })
    })

    it("removes attribute if present", async () => {
      const container = await fixture(html`
        <div>
          <div id="element1" my-attribute></div>
          <div id="element2" my-attribute></div>
          <div id="element3" my-attribute></div>
        </div>
      `)
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" targets="div > div"></turbo-stream>',
      )
      const elements = container.querySelectorAll("div")
      elements.forEach((element) => {
        assert.isFalse(element.hasAttribute("my-attribute"))
      })
    })

    it("should act as add attribute if force=true", async () => {
      const container = await fixture(html`
        <div>
          <div id="element1"></div>
          <div id="element2" my-attribute></div>
          <div id="element3"></div>
        </div>
      `)
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" force="true" targets="div > div"></turbo-stream>',
      )
      const elements = container.querySelectorAll("div")
      elements.forEach((element) => {
        assert.isTrue(element.hasAttribute("my-attribute"))
      })
    })

    it("should act as remove attribute if force=false", async () => {
      const container = await fixture(html`
        <div>
          <div id="element1"></div>
          <div id="element2" my-attribute></div>
          <div id="element3" my-attribute></div>
        </div>
      `)
      await executeStream(
        '<turbo-stream action="toggle_attribute" attribute="my-attribute" force="false" targets="div > div"></turbo-stream>',
      )
      const elements = container.querySelectorAll("div")
      elements.forEach((element) => {
        assert.isFalse(element.hasAttribute("my-attribute"))
      })
    })
  })
})
