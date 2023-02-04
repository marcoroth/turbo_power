import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

type AttributeToNotificationOptionKeyMappingRow = [string, string, boolean]

const ATTRIBUTE_TO_NOTIFICATION_OPTION_KEY_MAPPING: AttributeToNotificationOptionKeyMappingRow[] = [
  ["dir", "dir", false],
  ["lang", "lang", false],
  ["badge", "badge", false],
  ["body", "body", false],
  ["tag", "tag", false],
  ["icon", "icon", false],
  ["image", "image", false],
  ["data", "data", true],
  ["vibrate", "vibrate", true],
  ["renotify", "renotify", true],
  ["require-interaction", "requireInteraction", true],
  ["actions", "actions", true],
  ["silent", "silent", true],
]

export function notification(this: StreamElement) {
  const title = this.getAttribute("title") || ""

  const options = ATTRIBUTE_TO_NOTIFICATION_OPTION_KEY_MAPPING.reduce((acc, [attributeName, optionKey, parseJson]) => {
    const attributeValue = this.getAttribute(attributeName)

    if (attributeValue !== null) {
      const optionValue = parseJson ? JSON.parse(attributeValue) : attributeValue
      return { ...acc, [optionKey]: optionValue }
    } else {
      return acc
    }
  }, {})

  new Notification(title, options)
}

export function registerNotificationActions(streamActions: TurboStreamActions) {
  streamActions.notification = notification
}
