import { TurboStreamActions } from "./types"

import * as Attributes from "./actions/attributes"
import * as Browser from "./actions/browser"
import * as DOM from "./actions/dom"
import * as Events from "./actions/events"
import * as History from "./actions/history"
import * as Storage from "./actions/browser"

export function register(streamActions: TurboStreamActions) {
  Attributes.register(streamActions)
  Browser.register(streamActions)
  DOM.register(streamActions)
  Events.register(streamActions)
  History.register(streamActions)
  Storage.register(streamActions)
}
