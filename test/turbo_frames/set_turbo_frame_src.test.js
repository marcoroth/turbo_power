import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('set_turbo_frame_src')

describe('set_turbo_frame_src', () => {
  afterEach(() => {
    sinon.restore()
  })

  context('errors', () => {
    it('should print error if no src were provided', async () => {
      sinon.replace(console, 'error', sinon.fake())
      await fixture('<turbo-frame id="example-id"></turbo-frame>')

      const expectedError = `[TurboPower] no "src" provided for Turbo Streams operation "set_turbo_frame_src"`

      assert(!console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

      await executeStream('<turbo-stream action="set_turbo_frame_src" frame_id="example-id" src=""></turbo-stream>')

      assert(console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

    })

    it('should print error if no TurboFrame could be found', async () => {
      sinon.replace(console, 'error', sinon.fake())
      await fixture('<turbo-frame id="example-id"></turbo-frame>')

      const expectedError = `[TurboPower] couldn't find a TurboFrame with the ID: "non-existing-frame", for Turbo Streams operation "set_turbo_frame_src"`

      assert(!console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

      await executeStream('<turbo-stream action="set_turbo_frame_src" frame_id="non-existing-frame" src="/"></turbo-stream>')

      assert(console.error.calledWith(expectedError), `console.error wasn't called with "${expectedError}"`)

    })
  })

  context('set src attribute', () => {
    it('should set src attribute with value', async () => {
      await fixture('<turbo-frame id="example-id"></turbo-frame>')

      assert.equal(document.querySelector('#example-id').getAttribute('src'), null)

      await executeStream('<turbo-stream action="set_turbo_frame_src" frame_id="example-id" src="/"></turbo-stream>')

      assert.equal(document.querySelector('#example-id').getAttribute('src'), '/')
    })
  })
})
