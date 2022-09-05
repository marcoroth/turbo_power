import { StreamElement } from "@hotwired/turbo/dist/types/elements/stream_element"
import { TurboStreamActions } from "../types"

export function dispatch_event(this: StreamElement) {
  const name = this.getAttribute("name")
  const detailRaw = this.getAttribute("detail")

  try {
    const detail = detailRaw ? JSON.parse(detailRaw) : {}

    if (name) {
      const options = { bubbles: true, cancelable: true, detail }
      const event = new CustomEvent(name, options)

      this.targetElements.forEach((element: Element) => element.dispatchEvent(event))
    } else {
      console.warn(`[TurboPower] no "name" provided for Turbo Streams operation "dispatch_event"`)
    }
  } catch (error) {
    console.error(`[TurboPower] error proccessing provided "detail" ("${detailRaw}") for Turbo Streams operation "dispatch_event". Error: "${error.message}"`)
  }
}

export function register(streamActions: TurboStreamActions) {
  streamActions.dispatch_event = dispatch_event
}
