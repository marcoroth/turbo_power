import sinon from 'sinon'
import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('push_state')

describe('push_state', () => {
  afterEach(() => {
    sinon.restore()
  })

  context('all attributes', () => {
    it('should push item to history object', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state" title="title"></turbo-stream>`)

      assert(window.history.pushState.calledWith('state', 'title', 'http://localhost:8000/new-state'))
    })
  })

  context('title attribute', () => {
    it('should push item to history object with missing "title" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state"></turbo-stream>`)

      assert(window.history.pushState.calledWith('state', '', 'http://localhost:8000/new-state'))
    })

    it('should push item to history object with missing empty "title" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="state" title=""></turbo-stream>`)

      assert(window.history.pushState.calledWith('state', '', 'http://localhost:8000/new-state'))
    })
  })

  context('state attribute', () => {
    it('should push item to history object with missing "state" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state" title="title"></turbo-stream>`)

      assert(window.history.pushState.calledWith(null, 'title', 'http://localhost:8000/new-state'))
    })

    it('should push item to history object with missing empty "state" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream(`<turbo-stream action="push_state" url="${window.location.origin}/new-state" state="" title="title"></turbo-stream>`)

      assert(window.history.pushState.calledWith('', 'title', 'http://localhost:8000/new-state'))
    })
  })

  context('url attribute', () => {
    it('should push item to history object with missing "url" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream('<turbo-stream action="push_state" title="title" state="state"></turbo-stream>')

      assert(window.history.pushState.calledWith('state', 'title', null))
    })

    it('should push item to history object with missing empty "url" attribute', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream('<turbo-stream action="push_state" url="" state="state" title="title"></turbo-stream>')

      assert(window.history.pushState.calledWith('state', 'title', ''))
    })
  })

  context('no attributes', () => {
    it('should push item to history object with no attributes', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream('<turbo-stream action="push_state"></turbo-stream>')

      assert(window.history.pushState.calledWith(null, '', null))
    })

    it('should push item to history object with empty attributes', async () => {
      sinon.replace(window.history, 'pushState', sinon.fake())

      await executeStream('<turbo-stream action="push_state" url="" state="" title=""></turbo-stream>')

      assert(window.history.pushState.calledWith('', '', ''))
    })
  })
})
