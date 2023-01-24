import { assert, oneEvent } from '@open-wc/testing'
import { executeStream, registerAction, fixtureFile } from '../test_helpers'

registerAction('turbo_clear_cache')

describe('turbo_clear_cache', () => {
  context('with history snapshots present', () => {
    it('should clear the snapshots entries', async () => {
      Turbo.visit(fixtureFile('page1.html'))
      await oneEvent(document, 'turbo:load')

      Turbo.visit(fixtureFile('page2.html'))
      await oneEvent(document, 'turbo:load')

      Turbo.visit(fixtureFile('page3.html'))
      await oneEvent(document, 'turbo:load')

      assert.isAtLeast((Object.keys(Turbo.session.view.snapshotCache.snapshots).length), 1)
      await executeStream('<turbo-stream action="turbo_clear_cache"></turbo-stream>')
      assert.isAtMost(Object.keys(Turbo.session.view.snapshotCache.snapshots).length, 0)
    })
  })
})
