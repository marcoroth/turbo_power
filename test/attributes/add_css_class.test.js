import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('add_css_class')

describe('add_css_class', () => {
  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if no classes were provided', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "add_css_class"'

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="add_css_class" classes="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "classes" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "add_css_class"'

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="add_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('target', () => {
    it('should add one css class', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)

      await executeStream('<turbo-stream action="add_css_class" classes="one" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one')
    })

    it('should add one css class with existing class', async () => {
      await fixture('<div id="element" class="one"></div>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one')

      await executeStream('<turbo-stream action="add_css_class" classes="two" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one two')
    })

    it('should add multiple css classes', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)

      await executeStream('<turbo-stream action="add_css_class" classes="one two three" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one two three')
    })

    it('should add multiple css classes with exisiting classes', async () => {
      await fixture(html`
        <div id="element" class="already present classes"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('class'), 'already present classes')

      await executeStream('<turbo-stream action="add_css_class" classes="one two three" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'already present classes one two three')
    })
  })

  context('targets', () => {
    it('should add one css class', async () => {
      await fixture(html`
        <div id="one"></div>
        <div id="two"></div>
        <div id="three"></div>
      `)

      assert.equal(document.querySelector('#one').getAttribute('class'), null)
      assert.equal(document.querySelector('#two').getAttribute('class'), null)
      assert.equal(document.querySelector('#three').getAttribute('class'), null)

      await executeStream('<turbo-stream action="add_css_class" classes="one" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#one').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'one')
    })

    it('should add one css class with existing class', async () => {
      await fixture(html`
        <div id="one" class="one"></div>
        <div id="two" class="one"></div>
        <div id="three" class="one"></div>
      `)

      assert.equal(document.querySelector('#one').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'one')

      await executeStream('<turbo-stream action="add_css_class" classes="two" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#one').getAttribute('class'), 'one two')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'one two')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'one two')
    })

    it('should add multiple css classes', async () => {
      await fixture(html`
        <div id="one"></div>
        <div id="two"></div>
        <div id="three"></div>
      `)

      assert.equal(document.querySelector('#one').getAttribute('class'), null)
      assert.equal(document.querySelector('#two').getAttribute('class'), null)
      assert.equal(document.querySelector('#three').getAttribute('class'), null)

      await executeStream('<turbo-stream action="add_css_class" classes="one two three" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#one').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'one two three')
    })

    it('should add multiple css classes with exisiting classes', async () => {
      await fixture(html`
        <div id="one" class="already present classes"></div>
        <div id="two" class="already present classes"></div>
        <div id="three" class="already present classes"></div>
      `)

      assert.equal(document.querySelector('#one').getAttribute('class'), 'already present classes')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'already present classes')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'already present classes')

      await executeStream('<turbo-stream action="add_css_class" classes="one two three" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#one').getAttribute('class'), 'already present classes one two three')
      assert.equal(document.querySelector('#two').getAttribute('class'), 'already present classes one two three')
      assert.equal(document.querySelector('#three').getAttribute('class'), 'already present classes one two three')
    })
  })
})
