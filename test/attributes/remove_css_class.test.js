import { html, fixture, assert } from '@open-wc/testing'
import { executeStream } from '../test_helpers'

import sinon from 'sinon'
import * as Turbo from '@hotwired/turbo'

import TurboPower from '../../'
TurboPower.initialize(Turbo.StreamActions)

describe('remove_css_class', () => {
  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if no classes were provided', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "remove_css_class"'

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_css_class" classes="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "classes" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "classes" provided for Turbo Streams operation "remove_css_class"'

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_css_class" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), null)
      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('target', () => {
    it('should remove one css class', async () => {
      await fixture(html`
        <div id="element" class="one two"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one two')

      await executeStream('<turbo-stream action="remove_css_class" classes="one" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'two')
    })

    it('should remove last exisiting css class', async () => {
      await fixture(html`
        <div id="element" class="one"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one')

      await executeStream('<turbo-stream action="remove_css_class" classes="one" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), '')
    })

    it('should remove multiple css classes', async () => {
      await fixture(html`
        <div id="element" class="one two three"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one two three')

      await executeStream('<turbo-stream action="remove_css_class" classes="one two" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), 'three')
    })

    it('should remove all remaining css classes', async () => {
      await fixture(html`
        <div id="element" class="one two three"></div>
      `)

      assert.equal(document.querySelector('#element').getAttribute('class'), 'one two three')

      await executeStream('<turbo-stream action="remove_css_class" classes="one two three" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').getAttribute('class'), '')
    })
  })

  context('targets', () => {
    it('should remove one css class', async () => {
      await fixture(html`
        <div id="element1" class="one two"></div>
        <div id="element2" class="one two"></div>
        <div id="element3" class="one two"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'one two')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'one two')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'one two')

      await executeStream('<turbo-stream action="remove_css_class" classes="one" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'two')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'two')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'two')
    })

    it('should remove last exisiting css class', async () => {
      await fixture(html`
        <div id="element1" class="one"></div>
        <div id="element2" class="one"></div>
        <div id="element3" class="one"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'one')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'one')

      await executeStream('<turbo-stream action="remove_css_class" classes="one" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('class'), '')
      assert.equal(document.querySelector('#element2').getAttribute('class'), '')
      assert.equal(document.querySelector('#element3').getAttribute('class'), '')
    })

    it('should remove multiple css classes', async () => {
      await fixture(html`
        <div id="element1" class="one two three"></div>
        <div id="element2" class="one two three"></div>
        <div id="element3" class="one two three"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'one two three')

      await executeStream('<turbo-stream action="remove_css_class" classes="one two" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'three')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'three')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'three')
    })

    it('should remove all remaining css classes', async () => {
      await fixture(html`
        <div id="element1" class="one two three"></div>
        <div id="element2" class="one two three"></div>
        <div id="element3" class="one two three"></div>
      `)

      assert.equal(document.querySelector('#element1').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#element2').getAttribute('class'), 'one two three')
      assert.equal(document.querySelector('#element3').getAttribute('class'), 'one two three')

      await executeStream('<turbo-stream action="remove_css_class" classes="one two three" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').getAttribute('class'), '')
      assert.equal(document.querySelector('#element2').getAttribute('class'), '')
      assert.equal(document.querySelector('#element3').getAttribute('class'), '')
    })
  })
})
