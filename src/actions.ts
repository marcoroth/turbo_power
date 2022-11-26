import { TurboStreamActions } from "@hotwired/turbo"

import * as Attributes from "./actions/attributes"
import * as Browser from "./actions/browser"
import * as DOM from "./actions/dom"
import * as Debug from "./actions/debug"
import * as Events from "./actions/events"
import * as History from "./actions/history"
import * as Storage from "./actions/storage"
import * as TurboFrame from "./actions/turbo_frame"
import * as Turbo from "./actions/turbo"

export * from "./actions/attributes"
export * from "./actions/browser"
export * from "./actions/debug"
export * from "./actions/dom"
export * from "./actions/events"
export * from "./actions/history"
export * from "./actions/storage"
export * from "./actions/turbo_frame"
export * from "./actions/turbo"

export function register(streamActions: TurboStreamActions) {
  Attributes.registerAttributesActions(streamActions)
  Browser.registerBrowserActions(streamActions)
  Debug.registerDebugActions(streamActions)
  DOM.registerDOMActions(streamActions)
  Events.registerEventsActions(streamActions)
  History.registerHistoryActions(streamActions)
  Storage.registerStorageActions(streamActions)
  TurboFrame.registerTurboFrameActions(streamActions)
  Turbo.registerTurboActions(streamActions)
}
