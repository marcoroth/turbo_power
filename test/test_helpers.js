import { assert, nextFrame } from '@open-wc/testing'
import * as Turbo from '@hotwired/turbo'

import TurboPower from '../'

export async function executeStream (html) {
  document.body.insertAdjacentHTML('beforeend', html)
  await nextFrame()
}

export function registerAction (actionName) {
  const action = TurboPower.Actions[actionName]
  TurboPower.register(actionName, action, Turbo.StreamActions)
}

export function fixtureFile (fileName) {
  return `/test/fixtures/${fileName}`
}
