import { html, fixture, assert, nextFrame } from '@open-wc/testing'
import sinon from 'sinon'

import { executeStream } from '../test_helpers'

import * as Turbo from "@hotwired/turbo"

import TurboPower from '../../'
TurboPower.initialize(Turbo.StreamActions)

describe('remove_attribute', () => {
  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if attribute is empty', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture(`<div id="element"></div>`)

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "remove_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_attribute" attribute="" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture(`<div id="element"></div>`)

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "remove_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_attribute" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('target', () => {
    it('should remove attribute', async () => {
      await fixture(html`
        <div id="element" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector("#element").getAttribute("my-attribute"), "previous-value")

      await executeStream('<turbo-stream action="remove_attribute" attribute="my-attribute" target="element"></turbo-stream>')

      assert.equal(document.querySelector("#element").getAttribute("my-attribute"), null)
    })
  })

  context('targets', () => {
    it('should remove attribute', async () => {
      await fixture(html`
        <div id="element1" my-attribute="previous-value"></div>
        <div id="element2" my-attribute="previous-value"></div>
        <div id="element3" my-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector("#element1").getAttribute("my-attribute"), "previous-value")
      assert.equal(document.querySelector("#element2").getAttribute("my-attribute"), "previous-value")
      assert.equal(document.querySelector("#element3").getAttribute("my-attribute"), "previous-value")

      await executeStream('<turbo-stream action="remove_attribute" attribute="my-attribute" value="my-value" targets="div"></turbo-stream>')

      assert.equal(document.querySelector("#element1").getAttribute("my-attribute"), null)
      assert.equal(document.querySelector("#element2").getAttribute("my-attribute"), null)
      assert.equal(document.querySelector("#element3").getAttribute("my-attribute"), null)
    })
  })
})
