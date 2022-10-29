import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction, fixtureFile } from '../test_helpers'

registerAction('turbo_frame_set_src')

describe('turbo_frame_set_src', () => {

  it('should change frame src with the src attribute present', async () => {
    await fixture(html`
      <turbo-frame id="frame1" src="${fixtureFile('frame1.html')}">Loading</turbo-frame>
    `)
    let frame = document.querySelector('#frame1')
    await frame.loaded
    assert.equal(frame.querySelector('h1').innerText, 'Frame 1')

    await executeStream(`<turbo-stream action="turbo_frame_set_src" src="${fixtureFile('frame2.html')}" target="frame1"></turbo-stream>`)

    frame = document.querySelector('#frame1')
    await frame.loaded
    assert.equal(frame.querySelector('h1').innerText, 'Frame 2')
  })

  it('should change frame src with the src attribute not present', async () => {
    await fixture(html`
      <turbo-frame id="frame1">Loading</turbo-frame>
    `)
    let frame = document.querySelector('#frame1')
    assert.equal(frame.innerText, 'Loading')

    await executeStream(`<turbo-stream action="turbo_frame_set_src" src="${fixtureFile('frame2.html')}" target="frame1"></turbo-stream>`)

    frame = document.querySelector('#frame1')
    await frame.loaded
    assert.equal(frame.querySelector('h1').innerText, 'Frame 2')
  })
})
