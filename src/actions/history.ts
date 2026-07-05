import * as Turbo from "@hotwired/turbo"
import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function push_state(this: StreamElement) {
  const url = this.getAttribute("url")
  if (!url) return

  Turbo.navigator.history.push(new URL(url, document.baseURI))
}

export function replace_state(this: StreamElement) {
  const url = this.getAttribute("url")
  if (!url) return

  Turbo.navigator.history.replace(new URL(url, document.baseURI))
}

export function history_back(this: StreamElement) {
  window.history.back()
}

export function history_forward(this: StreamElement) {
  window.history.forward()
}

export function history_go(this: StreamElement) {
  const delta = Number(this.getAttribute("delta")) || 0
  window.history.go(delta)
}

export function registerHistoryActions(streamActions: TurboStreamActions) {
  streamActions.push_state = push_state
  streamActions.replace_state = replace_state
  streamActions.history_back = history_back
  streamActions.history_forward = history_forward
  streamActions.history_go = history_go
}
