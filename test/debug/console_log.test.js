import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('console_log')

describe('console_log', () => {
  afterEach(() => {
    sinon.restore()
  })

  context('no `log` level', () => {
    it('should log message', async () => {
      sinon.replace(console, 'log', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" message="Message"></turbo-stream>`)

      assert(console.log.calledWith('Message'))
    })
  })

  context('with level="log"', () => {
    it('should log message', async () => {
      sinon.replace(console, 'log', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" level="log" message="Message"></turbo-stream>`)

      assert(console.log.calledWith('Message'))
    })
  })

  context('with level="warn"', () => {
    it('should log message', async () => {
      sinon.replace(console, 'warn', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" level="warn" message="Warning"></turbo-stream>`)

      assert(console.warn.calledWith('Warning'))
    })
  })

  context('with level="info"', () => {
    it('should log message', async () => {
      sinon.replace(console, 'info', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" level="info" message="Information"></turbo-stream>`)

      assert(console.info.calledWith('Information'))
    })
  })

  context('with level="debug"', () => {
    it('should log message', async () => {
      sinon.replace(console, 'debug', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" level="debug" message="Debug"></turbo-stream>`)

      assert(console.debug.calledWith('Debug'))
    })
  })

  context('with level="debug"', () => {
    it('should log message', async () => {
      sinon.replace(console, 'error', sinon.fake())

      await executeStream(`<turbo-stream action="console_log" level="error" message="Error"></turbo-stream>`)

      assert(console.error.calledWith('Error'))
    })
  })
})
