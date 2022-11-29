import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import * as Turbo from "@hotwired/turbo"
import { Action } from "@hotwired/turbo/dist/types/core/types"
import { VisitOptions } from "@hotwired/turbo/dist/types/core/drive/visit"

type Visitable = {
  visit(location: URL | string, options?: Partial<VisitOptions>): void
}

declare global {
  interface Window {
    Turbo: typeof Turbo
    Turbolinks: Visitable
  }
}

export function redirect_to(this: StreamElement) {
  const url = this.getAttribute("url") || "/"
  const turboAction = (this.getAttribute("turbo_action") || "advance") as Action
  const turbo = this.getAttribute("turbo") === "true"

  if (turbo) {
    if (window.Turbo) window.Turbo.visit(url, { action: turboAction })
    if (window.Turbolinks) window.Turbolinks.visit(url, { action: turboAction })
    if (!window.Turbo && !window.Turbolinks) window.location.href = url
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
