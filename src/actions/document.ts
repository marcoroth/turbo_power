import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

function CookieStringBuilder(streamElement: StreamElement) {
  this.streamElement = streamElement
  this.value = ""

  // columns: [streamElementAttribute, cookieKey, isBooleanAttribute]
  this.attributeToCookieKeyMapping = [
    ["domain", "Domain", false],
    ["path", "Path", false],
    ["expires", "Expires", false],
    ["max-age", "Max-Age", false],
    ["http-only", "HttpOnly", true],
    ["secure", "Secure", true],
    ["same-site", "SameSite", false],
  ]

  this.append = ([streamElementAttribute, cookieKey, isBooleanAttribute]) => {
    const cookieValue = this.streamElement.getAttribute(streamElementAttribute)

    if (cookieValue !== null) {
      const cookieKeyPair = isBooleanAttribute ? cookieKey : `${cookieKey}=${cookieValue}`
      this.value = `${this.value}; ${cookieKeyPair}`
    }
  }

  this.build = () => {
    this.value = `${this.streamElement.getAttribute("name")}=${this.streamElement.getAttribute("value")}`
    this.attributeToCookieKeyMapping.forEach(this.append)

    return this.value
  }
}

export function set_cookie_item(this: StreamElement) {
  const cookieStringBuilder = new CookieStringBuilder(this)
  document.cookie = cookieStringBuilder.build()
}

export function registerDocumentActions(streamActions: TurboStreamActions) {
  streamActions.set_cookie_item = set_cookie_item
}
