import { TurboStreamAction, TurboStreamActions } from "@hotwired/turbo"

import TurboReady from "turbo_ready"
import * as TurboMorph from "turbo-morph"
import * as Actions from "./actions"
import * as Utils from "./utils"

export * as Actions from "./actions"
export * as Utils from "./utils"

export function initialize(streamActions: TurboStreamActions) {
  TurboMorph.initialize(streamActions)
  TurboReady.initialize(streamActions)
  Actions.register(streamActions)
}

export function register(name: string, action: TurboStreamAction, streamActions: TurboStreamActions) {
  streamActions[name] = action
}

export default {
  initialize,
  register,
  Actions,
  Utils,
}
