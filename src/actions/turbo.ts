import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import * as Turbo from "@hotwired/turbo"
import { Action } from "@hotwired/turbo/dist/types/core/types"

declare global {
  interface Window {
    Turbo: typeof Turbo
  }
}

export function redirect_to(this: StreamElement) {
  const url = this.getAttribute("url") || "/"
  const turboAction = (this.getAttribute("turbo-action") || "advance") as Action
  const turbo = this.getAttribute("turbo") === "true"

  if (turbo && window.Turbo) {
    window.Turbo.visit(url, { action: turboAction })
  } else {
    window.location.href = url
  }
}

export function turbo_clear_cache() {
  window.Turbo.cache.clear()
}

export function registerTurboActions(streamActions: TurboStreamActions) {
  streamActions.redirect_to = redirect_to
  streamActions.turbo_clear_cache = turbo_clear_cache
}
