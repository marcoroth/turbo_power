import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('set_title')

describe('set_title', () => {
  afterEach(() => {
    document.querySelector('title')?.remove()
  })

  context('with title element present', () => {
    it('should set title', async () => {
      await fixture(html`
        <html>
          <head>
            <title>Title</title>
          </head>
        </html>
      `)

      assert.equal(document.querySelector('title').textContent, 'Title')

      await executeStream('<turbo-stream action="set_title" title="My Title"></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, 'My Title')
    })

    it('should set title with empty "title" attribute', async () => {
      await fixture(html`
        <html>
          <head>
            <title>Title</title>
          </head>
        </html>
      `)

      assert.equal(document.querySelector('title').textContent, 'Title')

      await executeStream('<turbo-stream action="set_title" title=""></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, '')
    })

    it('should set empty title with missing "title" attribute', async () => {
      await fixture(html`
        <html>
          <head>
            <title>Title</title>
          </head>
        </html>
      `)

      assert.equal(document.querySelector('title').textContent, 'Title')

      await executeStream('<turbo-stream action="set_title"></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, '')
    })
  })

  context('with no title element', () => {
    it('should set title', async () => {
      await fixture(html`
        <html>
          <head></head>
        </html>
      `)

      assert.equal(document.querySelector('title'), null)

      await executeStream('<turbo-stream action="set_title" title="My Title"></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, 'My Title')
    })

    it('should set title with empty "title" attribute', async () => {
      await fixture(html`
        <html>
          <head></head>
        </html>
      `)

      assert.equal(document.querySelector('title'), null)

      await executeStream('<turbo-stream action="set_title" title=""></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, '')
    })

    it('should set empty title with missing "title" attribute', async () => {
      await fixture(html`
        <html>
          <head></head>
        </html>
      `)

      assert.equal(document.querySelector('title'), null)

      await executeStream('<turbo-stream action="set_title"></turbo-stream>')

      assert.equal(document.querySelector('title').textContent, '')
    })
  })
})
