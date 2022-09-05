import { assert, nextFrame } from '@open-wc/testing'

export async function executeStream(html) {
  document.body.insertAdjacentHTML('beforeend', html)
  await nextFrame()
}
