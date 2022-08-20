import { TurboStreamActions } from "./types"

// @ts-ignore
import TurboReady from "turbo_ready"
import * as TurboMorph from "turbo-morph"
import * as Actions from "./actions"

export function initialize(streamActions: TurboStreamActions) {
  TurboMorph.registerMorph()
  TurboReady.initialize(streamActions)
  Actions.register(streamActions)
}

export default {
  initialize
}
