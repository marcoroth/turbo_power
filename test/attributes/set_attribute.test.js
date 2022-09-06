import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('set_attribute')

describe('set_attribute', () => {
  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if attribute is empty', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "set_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_attribute" attribute="" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "set_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_attribute" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('target', () => {
    it('should set attribute with value', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), null)

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="my-value" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), 'my-value')
    })

    it('should set attribute with empty value', async () => {
      await fixture('<div id="element" my-attribute="previous-value"></div>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), '')
    })

    it('should override previous attribute value with empty value', async () => {
      await fixture(html`
        <div id="element" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), '')
    })

    it('should override previous attribute value with missing "value" attribute', async () => {
      await fixture(html`
        <div id="element" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('my-attribute'), '')
    })
  })

  context('targets', () => {
    it('should set attribute with value', async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), null)
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), null)
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), null)

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="my-value" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), 'my-value')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), 'my-value')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), 'my-value')
    })

    it('should set attribute with empty value', async () => {
      await fixture(html`
        <div id="element1" my-attribute="previous-value"></div>
        <div id="element2" my-attribute="previous-value"></div>
        <div id="element3" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), '')
    })

    it('should override previous attribute value with empty value', async () => {
      await fixture(html`
        <div id="element1" my-attribute="previous-value"></div>
        <div id="element2" my-attribute="previous-value"></div>
        <div id="element3" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" value="" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), '')
    })

    it('should override previous attribute value with missing "value" attribute', async () => {
      await fixture(html`
        <div id="element1" my-attribute="previous-value"></div>
        <div id="element2" my-attribute="previous-value"></div>
        <div id="element3" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), 'previous-value')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), 'previous-value')

      await executeStream('<turbo-stream action="set_attribute" attribute="my-attribute" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element2').getAttribute('my-attribute'), '')
      assert.equal(document.querySelector('#element3').getAttribute('my-attribute'), '')
    })
  })
})
