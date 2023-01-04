import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('reset_form')

describe('reset_form', () => {
  context('target', () => {
    it('should reset form', async () => {
      await fixture(html`
        <form id="form">
          <input id="input"/>
          <textarea id="textarea"></textarea>
        </form>
      `)

      const input = document.querySelector('#input')
      const textarea = document.querySelector('#textarea')

      assert.equal(input.value, "")
      assert.equal(textarea.value, "")

      input.value = "123"
      textarea.value = "Text"

      assert.equal(input.value, "123")
      assert.equal(textarea.value, "Text")

      await executeStream('<turbo-stream action="reset_form" target="form"></turbo-stream>')

      assert.equal(input.value, "")
      assert.equal(textarea.value, "")
    })
  })

  context('targets', () => {
    it('should reset forms', async () => {
      await fixture(html`
        <form class="form" id="form1">
          <input id="input1"/>
          <textarea id="textarea1"></textarea>
        </form>

        <form class="form" id="form2">
          <input id="input2" value="456"/>
          <textarea id="textarea2">Text2</textarea>
        </form>
      `)

      const input1 = document.querySelector('#input1')
      const input2 = document.querySelector('#input2')
      const textarea1 = document.querySelector('#textarea1')
      const textarea2 = document.querySelector('#textarea2')

      assert.equal(input1.value, "")
      assert.equal(input2.value, "456")
      assert.equal(textarea1.value, "")
      assert.equal(textarea2.value, "Text2")

      input1.value = "123"
      input2.value = "789"
      textarea1.value = "Text3"
      textarea2.value = "Text4"

      assert.equal(input1.value, "123")
      assert.equal(input2.value, "789")
      assert.equal(textarea1.value, "Text3")
      assert.equal(textarea2.value, "Text4")

      await executeStream('<turbo-stream action="reset_form" targets=".form"></turbo-stream>')

      assert.equal(input1.value, "")
      assert.equal(input2.value, "456")
      assert.equal(textarea1.value, "")
      assert.equal(textarea2.value, "Text2")
    })
  })
})
