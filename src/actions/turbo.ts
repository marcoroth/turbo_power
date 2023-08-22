import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import { Action } from "@hotwired/turbo/dist/types/core/types"
import Proxy from "../proxy"

export function redirect_to(this: StreamElement) {
  const url = this.getAttribute("url") || "/"
  const turboAction = (this.getAttribute("turbo-action") || "advance") as Action
  const turboFrame = (this.getAttribute("turbo-frame")) as Action
  const turbo = this.getAttribute("turbo") !== "false"

  if (turbo && window.Turbo) {
    window.Turbo.visit(url, { action: turboAction, frame: turboFrame })
  } else {
    Proxy.location.assign(url)
  }
}

export function turbo_clear_cache() {
  window.Turbo.cache.clear()
}

export function registerTurboActions(streamActions: TurboStreamActions) {
  streamActions.redirect_to = redirect_to
  streamActions.turbo_clear_cache = turbo_clear_cache
}
