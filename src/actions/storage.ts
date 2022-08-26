import { StreamElement } from "@hotwired/turbo/dist/types/elements/stream_element"
import { TurboStreamActions } from "../types"

function storage(type: string | null): Storage {
  return type === 'session' ? window.sessionStorage : window.localStorage
}

export function clear_storage(this: StreamElement) {
  const type = this.getAttribute('type')

  storage(type).clear()
}

export function set_storage_item(this: StreamElement) {
  const key = this.getAttribute('key')
  const value = this.getAttribute('value') || ''
  const type = this.getAttribute('type')

  if (key) {
    storage(type).setItem(key, value)
  } else {
    console.error(`[TurboPower] no key provided for Turbo Streams operation "set_storage_item"`)
  }
}

export function remove_storage_item(this: StreamElement) {
  const key = this.getAttribute('key')
  const type = this.getAttribute('type')

  if (key) {
    storage(type).removeItem(key)
  } else {
    console.error(`no key provided for Turbo Streams operation "remove_storage_item"`)
  }
}


export function register(streamActions: TurboStreamActions) {
  streamActions.clear_storage = clear_storage
  streamActions.set_storage_item = set_storage_item
  streamActions.remove_storage_item = remove_storage_item
}
