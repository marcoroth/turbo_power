import { html, fixture, assert } from '@open-wc/testing'
import { executeStream, registerAction, fixtureFile } from '../test_helpers'

registerAction('turbo_frame_reload')

describe('turbo_frame_reload', () => {

  it('should reload a frame', async () => {
    const frameFile = fixtureFile('frame1.html')
    await fixture(html`
      <turbo-frame id="frame1" src="${frameFile}">Loading</turbo-frame>
    `)
    let frame = document.querySelector('#frame1')
    await frame.loaded
    const timeBeforeReload = frame.querySelector('time').innerText

    await executeStream(`<turbo-stream action="turbo_frame_reload" target="frame1"></turbo-stream>`)

    await frame.loaded
    frame = document.querySelector('#frame1')
    const timeAfterReload = frame.querySelector('time').innerText
    assert.notEqual(timeBeforeReload, timeAfterReload)
  })

})
