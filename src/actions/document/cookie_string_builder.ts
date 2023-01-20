import { StreamElement } from "@hotwired/turbo"

type MappingRow = [string, string, boolean]

export class CookieStringBuilder {
  ATTRIBUTE_TO_COOKIE_KEY_MAPPING: MappingRow[] = [
    ["domain", "Domain", false],
    ["path", "Path", false],
    ["expires", "Expires", false],
    ["max-age", "Max-Age", false],
    ["http-only", "HttpOnly", true],
    ["secure", "Secure", true],
    ["same-site", "SameSite", false],
  ]

  streamElement: StreamElement

  constructor(streamElement: StreamElement) {
    this.streamElement = streamElement
  }

  build(): string {
    let cookieString = `${this.streamElement.getAttribute("name")}=${this.streamElement.getAttribute("value")}`

    this.ATTRIBUTE_TO_COOKIE_KEY_MAPPING.forEach(([streamElementAttribute, cookieKey, isBooleanAttribute]) => {
      const cookieValue = this.streamElement.getAttribute(streamElementAttribute)

      if (cookieValue !== null) {
        const cookieKeyPair = isBooleanAttribute ? cookieKey : `${cookieKey}=${cookieValue}`
        cookieString = `${cookieString}; ${cookieKeyPair}`
      }
    })

    return cookieString
  }
}
