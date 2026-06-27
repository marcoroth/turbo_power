import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import { Action } from "@hotwired/turbo/dist/types/core/types"
import { VisitOptions } from "@hotwired/turbo/dist/types/core/drive/visit"
import Proxy from "../proxy"

export function redirect_to(this: StreamElement) {
  const url = this.getAttribute("url") || "/"
  const turboAction = (this.getAttribute("turbo-action") || "advance") as Action
  const turboFrame = this.getAttribute("turbo-frame")
  const turbo = this.getAttribute("turbo") !== "false"
  const options: Partial<VisitOptions> = {
    action: turboAction,
  }

  if (turboFrame) {
    options.frame = turboFrame
  }

  if (turbo && window.Turbo) {
    window.Turbo.visit(url, options)
  } else {
    Proxy.location.assign(url)
  }
}

export function turbo_visit(this: StreamElement) {
  const location = this.getAttribute("location") || "/"
  const turboAction = (this.getAttribute("turbo-action") || "advance") as Action
  const turboFrame = this.getAttribute("turbo-frame")
  const options: Partial<VisitOptions> = {
    action: turboAction,
  }

  if (turboFrame) {
    options.frame = turboFrame
  }

  window.Turbo.visit(location, options)
}

export function turbo_clear_cache() {
  window.Turbo.cache.clear()
}

export function registerTurboActions(streamActions: TurboStreamActions) {
  streamActions.redirect_to = redirect_to
  streamActions.turbo_visit = turbo_visit
  streamActions.turbo_clear_cache = turbo_clear_cache
}
