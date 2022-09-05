import { html, fixture, assert } from '@open-wc/testing'
import { executeStream } from '../test_helpers'

import sinon from 'sinon'
import * as Turbo from '@hotwired/turbo'

import TurboPower from '../../'
TurboPower.initialize(Turbo.StreamActions)

describe('set_dataset_attribute', () => {
  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if attribute is empty', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "set_dataset_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await fixture('<div id="element"></div>')

      const expectedWarning = '[TurboPower] no "attribute" provided for Turbo Streams operation "set_dataset_attribute"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_dataset_attribute" target="element"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('target', () => {
    it('should set data attribute with value', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').dataset.attribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="my-value" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.attribute, 'my-value')
    })

    it('should set data attribute with empty value', async () => {
      await fixture('<div id="element" data-attribute="previous-value"></div>')

      assert.equal(document.querySelector('#element').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.attribute, '')
    })

    it('should override previous data attribute value with empty value', async () => {
      await fixture(html`
        <div id="element" data-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.attribute, '')
    })

    it('should override previous data attribute value with missing "value" attribute', async () => {
      await fixture(html`
        <div id="element" data-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.attribute, '')
    })

    it('should set camel cased data attribute', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').dataset.camelcasedAttribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="camelcasedAttribute" value="camelcasedValue" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.camelcasedAttribute, 'camelcasedValue')
    })

    it('should set dashed data attribute', async () => {
      await fixture('<div id="element"></div>')

      assert.equal(document.querySelector('#element').dataset.dashedAttribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="dashed-attribute" value="dashed-value" target="element"></turbo-stream>')

      assert.equal(document.querySelector('#element').dataset.dashedAttribute, 'dashed-value')
    })
  })

  context('targets', () => {
    it('should set data attribute with value', async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.attribute, null)
      assert.equal(document.querySelector('#element2').dataset.attribute, null)
      assert.equal(document.querySelector('#element3').dataset.attribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="my-value" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.attribute, 'my-value')
      assert.equal(document.querySelector('#element2').dataset.attribute, 'my-value')
      assert.equal(document.querySelector('#element3').dataset.attribute, 'my-value')
    })

    it('should set data attribute with empty value', async () => {
      await fixture(html`
        <div id="element1" data-attribute="previous-value"></div>
        <div id="element2" data-attribute="previous-value"></div>
        <div id="element3" data-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element2').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element3').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.attribute, '')
      assert.equal(document.querySelector('#element2').dataset.attribute, '')
      assert.equal(document.querySelector('#element3').dataset.attribute, '')
    })

    it('should override previous data attribute value with empty value', async () => {
      await fixture(html`
        <div id="element1" data-attribute="previous-value"></div>
        <div id="element2" data-attribute="previous-value"></div>
        <div id="element3" data-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element2').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element3').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" value="" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.attribute, '')
      assert.equal(document.querySelector('#element2').dataset.attribute, '')
      assert.equal(document.querySelector('#element3').dataset.attribute, '')
    })

    it('should override previous data attribute value with missing "value" attribute', async () => {
      await fixture(html`
        <div id="element1" data-attribute="previous-value"></div>
        <div id="element2" data-attribute="previous-value"></div>
        <div id="element3" data-attribute="previous-value"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element2').dataset.attribute, 'previous-value')
      assert.equal(document.querySelector('#element3').dataset.attribute, 'previous-value')

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="attribute" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.attribute, '')
      assert.equal(document.querySelector('#element2').dataset.attribute, '')
      assert.equal(document.querySelector('#element3').dataset.attribute, '')
    })

    it('should set camel cased data attribute', async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.camelcasedAttribute, null)
      assert.equal(document.querySelector('#element2').dataset.camelcasedAttribute, null)
      assert.equal(document.querySelector('#element3').dataset.camelcasedAttribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="camelcasedAttribute" value="camelcasedValue" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.camelcasedAttribute, 'camelcasedValue')
      assert.equal(document.querySelector('#element2').dataset.camelcasedAttribute, 'camelcasedValue')
      assert.equal(document.querySelector('#element3').dataset.camelcasedAttribute, 'camelcasedValue')
    })

    it('should set dashed data attribute', async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      assert.equal(document.querySelector('#element1').dataset.dashedAttribute, null)
      assert.equal(document.querySelector('#element2').dataset.dashedAttribute, null)
      assert.equal(document.querySelector('#element3').dataset.dashedAttribute, null)

      await executeStream('<turbo-stream action="set_dataset_attribute" attribute="dashed-attribute" value="dashed-value" targets="div"></turbo-stream>')

      assert.equal(document.querySelector('#element1').dataset.dashedAttribute, 'dashed-value')
      assert.equal(document.querySelector('#element2').dataset.dashedAttribute, 'dashed-value')
      assert.equal(document.querySelector('#element3').dataset.dashedAttribute, 'dashed-value')
    })
  })
})
