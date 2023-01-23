import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import { CookieStringBuilder } from "./document/cookie_string_builder"

export function set_cookie(this: StreamElement) {
  const cookie = this.getAttribute("cookie") || ""

  document.cookie = cookie
}

export function set_cookie_item(this: StreamElement) {
  const cookieStringBuilder = new CookieStringBuilder(this)
  document.cookie = cookieStringBuilder.build()
}

export function registerDocumentActions(streamActions: TurboStreamActions) {
  streamActions.set_cookie = set_cookie
  streamActions.set_cookie_item = set_cookie_item
}
