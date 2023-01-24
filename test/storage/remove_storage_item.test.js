import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('remove_storage_item')

describe('remove_storage_item', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  context('warnings', () => {
    afterEach(() => {
      sinon.restore()
    })

    it('should do nothing and print warning if attribute is empty', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "remove_storage_item"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_storage_item" key=""></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      const expectedWarning = '[TurboPower] no "key" provided for Turbo Streams operation "remove_storage_item"'

      assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

      await executeStream('<turbo-stream action="remove_storage_item"></turbo-stream>')

      assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
    })
  })

  context('localStorage', () => {
    it('should remove local storage item with no type', async () => {
      localStorage.setItem('key1', 'value1')
      sessionStorage.setItem('key1', 'value1')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(sessionStorage.getItem('key1'), 'value1')

      await executeStream('<turbo-stream action="remove_storage_item" key="key1"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key1'), 'value1')
    })

    it('should remove local storage item with "type=local"', async () => {
      localStorage.setItem('key1', 'value1')
      sessionStorage.setItem('key1', 'value1')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(sessionStorage.getItem('key1'), 'value1')

      await executeStream('<turbo-stream action="remove_storage_item" key="key1" type="local"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key1'), 'value1')
    })
  })

  context('sessionStorage', () => {
    it('should remove session storage item with "type=session"', async () => {
      sessionStorage.setItem('key1', 'value1')
      localStorage.setItem('key1', 'value1')

      assert.equal(sessionStorage.getItem('key1'), 'value1')
      assert.equal(localStorage.getItem('key1'), 'value1')

      await executeStream('<turbo-stream action="remove_storage_item" key="key1" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key1'), 'value1')
    })
  })
})
