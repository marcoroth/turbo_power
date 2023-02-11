import { TurboStreamActions } from "@hotwired/turbo"

import * as Attributes from "./actions/attributes"
import * as Browser from "./actions/browser"
import * as Debug from "./actions/debug"
import * as Deprecated from "./actions/deprecated"
import * as Document from "./actions/document"
import * as DOM from "./actions/dom"
import * as Events from "./actions/events"
import * as Form from "./actions/form"
import * as History from "./actions/history"
import * as Notification from "./actions/notification"
import * as Storage from "./actions/storage"
import * as Turbo from "./actions/turbo"
import * as TurboFrame from "./actions/turbo_frame"

export * from "./actions/attributes"
export * from "./actions/browser"
export * from "./actions/debug"
export * from "./actions/deprecated"
export * from "./actions/document"
export * from "./actions/dom"
export * from "./actions/events"
export * from "./actions/form"
export * from "./actions/history"
export * from "./actions/notification"
export * from "./actions/storage"
export * from "./actions/turbo"
export * from "./actions/turbo_frame"

export function register(streamActions: TurboStreamActions) {
  Attributes.registerAttributesActions(streamActions)
  Browser.registerBrowserActions(streamActions)
  Debug.registerDebugActions(streamActions)
  Deprecated.registerDeprecatedActions(streamActions)
  Document.registerDocumentActions(streamActions)
  DOM.registerDOMActions(streamActions)
  Events.registerEventsActions(streamActions)
  Form.registerFormActions(streamActions)
  History.registerHistoryActions(streamActions)
  Notification.registerNotificationActions(streamActions)
  Storage.registerStorageActions(streamActions)
  Turbo.registerTurboActions(streamActions)
  TurboFrame.registerTurboFrameActions(streamActions)
}
