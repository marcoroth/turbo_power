import sinon from "sinon"
import { assert, fixture, html } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("scroll_into_view")

describe("scroll_into_view", () => {
  afterEach(() => {
    sinon.restore()
  })

  context("no options", () => {
    it("calls scrollIntoView() on element", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(`<turbo-stream action="scroll_into_view" target="element"></turbo-stream>`)

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, undefined)
    })
  })

  context("with align-to-top option", () => {
    it("calls with true", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(
        `<turbo-stream action="scroll_into_view" target="element" align-to-top="true"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, true)
    })

    it("calls with false", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(
        `<turbo-stream action="scroll_into_view" target="element" align-to-top="false"></turbo-stream>`,
      )

      assert.equal(fake.callCount, 1)
      assert.equal(fake.firstArg, false)
    })
  })

  context("with block option", () => {
    it("calls scrollIntoView() on element", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(`<turbo-stream action="scroll_into_view" target="element" block="end"></turbo-stream>`)

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstArg, { block: "end" })
    })
  })

  context("with inline option", () => {
    it("calls scrollIntoView() on element", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(`<turbo-stream action="scroll_into_view" target="element" inline="nearest"></turbo-stream>`)

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstArg, { inline: "nearest" })
    })
  })

  context("with behavior option", () => {
    it("calls scrollIntoView() on element", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(`<turbo-stream action="scroll_into_view" target="element" behavior="smooth"></turbo-stream>`)

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstArg, { behavior: "smooth" })
    })
  })

  context("with block, inline and behavior option", () => {
    it("calls scrollIntoView() on element", async () => {
      const element = await fixture(html`<div id="element"></div>`)
      const fake = sinon.replace(element, "scrollIntoView", sinon.fake())

      assert.equal(fake.callCount, 0)

      await executeStream(`<turbo-stream action="scroll_into_view" target="element" block="end" inline="nearest" behavior="smooth"></turbo-stream>`)

      assert.equal(fake.callCount, 1)
      assert.deepEqual(fake.firstArg, { behavior: "smooth", block: "end", inline: "nearest" })
    })
  })
})
