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

export function reload(this: StreamElement) {
  window.location.reload()
}

export function scroll_into_view(this: StreamElement) {
  this.targetElements.forEach((element: Element) => element.scrollIntoView())
}

export function set_cookie(this: StreamElement) {
  const cookie = this.getAttribute("cookie") || ""

  document.cookie = cookie
}

export function set_cookie_item(this: StreamElement) {
  console.log("set_cookie_item", this)
}

export function set_focus(this: StreamElement) {
  this.targetElements.forEach((element: HTMLElement) => element.focus())
}

export function set_title(this: StreamElement) {
  const title = this.getAttribute("title") || ""
  let titleElement = document.head.querySelector("title")

  if (!titleElement) {
    titleElement = document.createElement("title")
    document.head.appendChild(titleElement)
  }

  titleElement.textContent = title
}

export function turbo_clear_cache() {
  window.Turbo.cache.clear()
}

export function registerBrowserActions(streamActions: TurboStreamActions) {
  streamActions.redirect_to = redirect_to
  streamActions.reload = reload
  streamActions.scroll_into_view = scroll_into_view
  streamActions.set_cookie = set_cookie
  streamActions.set_cookie_item = set_cookie_item
  streamActions.set_focus = set_focus
  streamActions.set_title = set_title
  streamActions.turbo_clear_cache = turbo_clear_cache
}
