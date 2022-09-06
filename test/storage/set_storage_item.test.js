import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('set_storage_item')

describe('set_storage_item', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if attribute is empty', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "set_storage_item"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_storage_item" key=""></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "set_storage_item"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="set_storage_item"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('localStorage', () => {
    it('should set local storage item with value', async () => {
      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value="value1"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(sessionStorage.getItem('key1'), null)
    })

    it('should set local storage item with value and "type=local"', async () => {
      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value="value1" type="local"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(sessionStorage.getItem('key1'), null)
    })

    it('should set local storage item with empty value', async () => {
      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value=""></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), '')
      assert.equal(sessionStorage.getItem('key1'), null)
    })

    it('should override previous local storage item value with empty value', async () => {
      localStorage.setItem('key1', 'value')

      assert.equal(localStorage.getItem('key1'), 'value')
      assert.equal(sessionStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value=""></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), '')
      assert.equal(sessionStorage.getItem('key1'), null)
    })

    it('should override previous local storage item value with missing "value" attribute', async () => {
      localStorage.setItem('key1', 'value')

      assert.equal(localStorage.getItem('key1'), 'value')
      assert.equal(sessionStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), '')
      assert.equal(sessionStorage.getItem('key1'), null)
    })
  })

  context('sessionStorage', () => {
    it('should set session storage item with value and "type=session"', async () => {
      assert.equal(sessionStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value="value1" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), 'value1')
      assert.equal(localStorage.getItem('key1'), null)
    })

    it('should set session storage item with empty value', async () => {
      assert.equal(sessionStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value=""  type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), '')
      assert.equal(localStorage.getItem('key1'), null)
    })

    it('should override previous session storage item value with empty value', async () => {
      sessionStorage.setItem('key1', 'value')

      assert.equal(sessionStorage.getItem('key1'), 'value')
      assert.equal(localStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" value=""  type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), '')
      assert.equal(localStorage.getItem('key1'), null)
    })

    it('should override previous session storage item value with missing "value" attribute', async () => {
      sessionStorage.setItem('key1', 'value')

      assert.equal(sessionStorage.getItem('key1'), 'value')
      assert.equal(localStorage.getItem('key1'), null)

      await executeStream('<turbo-stream action="set_storage_item" key="key1" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), '')
      assert.equal(localStorage.getItem('key1'), null)
    })
  })
})
