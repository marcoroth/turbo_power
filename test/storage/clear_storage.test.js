import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('clear_storage')

describe('clear_storage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  context('localStorage', () => {
    it('should clear localStorage with not defined type', async () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')
      sessionStorage.setItem('key3', 'value3')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(localStorage.getItem('key2'), 'value2')
      assert.equal(sessionStorage.getItem('key3'), 'value3')

      await executeStream('<turbo-stream action="clear_storage"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key2'), null)
      assert.equal(sessionStorage.getItem('key3'), 'value3')
    })

    it('should clear localStorage with empty "type" attribute', async () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')
      sessionStorage.setItem('key3', 'value3')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(localStorage.getItem('key2'), 'value2')
      assert.equal(sessionStorage.getItem('key3'), 'value3')

      await executeStream('<turbo-stream action="clear_storage" type=""></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key2'), null)
      assert.equal(sessionStorage.getItem('key3'), 'value3')
    })

    it('should clear localStorage with "type=local"', async () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')
      sessionStorage.setItem('key3', 'value3')

      assert.equal(localStorage.getItem('key1'), 'value1')
      assert.equal(localStorage.getItem('key2'), 'value2')
      assert.equal(sessionStorage.getItem('key3'), 'value3')

      await executeStream('<turbo-stream action="clear_storage" type="local"></turbo-stream>')

      assert.equal(localStorage.getItem('key1'), null)
      assert.equal(localStorage.getItem('key2'), null)
      assert.equal(sessionStorage.getItem('key3'), 'value3')
    })
  })

  context('sessionStorage', () => {
    it('should clear sessionStorage with "type=session"', async () => {
      sessionStorage.setItem('key1', 'value1')
      sessionStorage.setItem('key2', 'value2')
      localStorage.setItem('key3', 'value3')

      assert.equal(sessionStorage.getItem('key1'), 'value1')
      assert.equal(sessionStorage.getItem('key2'), 'value2')
      assert.equal(localStorage.getItem('key3'), 'value3')

      await executeStream('<turbo-stream action="clear_storage" type="session"></turbo-stream>')

      assert.equal(sessionStorage.getItem('key1'), null)
      assert.equal(sessionStorage.getItem('key2'), null)
      assert.equal(localStorage.getItem('key3'), 'value3')
    })
  })
})
