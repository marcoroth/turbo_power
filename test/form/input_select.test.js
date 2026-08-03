import { html, fixture, assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("input_select")

describe("input_select", () => {
  context("target", () => {
    it("should select the input text", async () => {
      await fixture(html` <input id="input" value="Hello World" /> `)

      const input = document.querySelector("#input")

      assert.equal(input.selectionStart, input.selectionEnd)

      await executeStream('<turbo-stream action="input_select" target="input"></turbo-stream>')

      assert.equal(input.selectionStart, 0)
      assert.equal(input.selectionEnd, input.value.length)
    })
  })

  context("targets", () => {
    it("should select the text of multiple inputs", async () => {
      await fixture(html`
        <input class="input" id="input1" value="First" />
        <input class="input" id="input2" value="Second" />
      `)

      const input1 = document.querySelector("#input1")
      const input2 = document.querySelector("#input2")

      await executeStream('<turbo-stream action="input_select" targets=".input"></turbo-stream>')

      assert.equal(input1.selectionStart, 0)
      assert.equal(input1.selectionEnd, input1.value.length)
      assert.equal(input2.selectionStart, 0)
      assert.equal(input2.selectionEnd, input2.value.length)
    })
  })
})
