import { TurboStreamActions } from "@hotwired/turbo"

import * as Attributes from "./actions/attributes"
import * as Browser from "./actions/browser"
import * as DOM from "./actions/dom"
import * as Events from "./actions/events"
import * as History from "./actions/history"
import * as Storage from "./actions/storage"

export * from "./actions/attributes"
export * from "./actions/browser"
export * from "./actions/dom"
export * from "./actions/events"
export * from "./actions/history"
export * from "./actions/storage"

export function register(streamActions: TurboStreamActions) {
  Attributes.registerAttributesActions(streamActions)
  Browser.registerBrowserActions(streamActions)
  DOM.registerDOMActions(streamActions)
  Events.registerEventsActions(streamActions)
  History.registerHistoryActions(streamActions)
  Storage.registerStorageActions(streamActions)
}
