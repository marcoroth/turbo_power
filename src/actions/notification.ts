import { StreamElement, TurboStreamActions } from "@hotwired/turbo"
import { camelize, typecast } from "../utils"

const PERMITTED_ATTRIBUTES = [
  "dir",
  "lang",
  "badge",
  "body",
  "tag",
  "icon",
  "image",
  "data",
  "vibrate",
  "renotify",
  "require-interaction",
  "actions",
  "silent",
]

const createNotification = (streamElement: StreamElement) => {
  const title = streamElement.getAttribute("title") || ""

  const options = Array.from(streamElement.attributes)
    .filter((attribute) => PERMITTED_ATTRIBUTES.includes(attribute.name))
    .reduce((acc, attribute) => {
      return { ...acc, [camelize(attribute.name)]: typecast(attribute.value) }
    }, {})

  new Notification(title, options)
}

export function notification(this: StreamElement) {
  if (!window.Notification) {
    alert("This browser does not support desktop notification")
  } else if (Notification.permission === "granted") {
    createNotification(this)
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        createNotification(this)
      }
    })
  }
}

export function registerNotificationActions(streamActions: TurboStreamActions) {
  streamActions.notification = notification
}
