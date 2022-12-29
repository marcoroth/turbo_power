import sinon from 'sinon'
import { assert } from '@open-wc/testing'
import { executeStream, registerAction } from '../test_helpers'

registerAction('invoke')

describe('invoke', () => {
  it('show deprecation warning', async () => {
    sinon.replace(console, 'warn', sinon.fake())

    const expectedWarning = "[TurboPower] The `invoke` Turbo Stream Action was removed from TurboPower. If you'd like to continue using this action please use the successor library instead. Read more here: https://github.com/hopsoft/turbo_boost-streams"

    assert(!console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)

    await executeStream('<turbo-stream action="invoke"></turbo-stream>')

    assert(console.warn.calledWith(expectedWarning), `console.warn wasn't called with "${expectedWarning}"`)
  })
})
