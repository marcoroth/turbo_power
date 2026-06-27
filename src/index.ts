import * as Turbo from "@hotwired/turbo"
import { TurboStreamAction, TurboStreamActions } from "@hotwired/turbo"
import { BrowserAdapter } from "@hotwired/turbo/dist/types/core/native/browser_adapter"

import * as TurboMorph from "turbo-morph"
import * as Actions from "./actions"
import * as Utils from "./utils"
import type { ActionGroup } from "./actions"

export * as Actions from "./actions"
export * as Utils from "./utils"

export {
  ActionGroups,
  allActionGroups,
  AttributeActions,
  BrowserActions,
  DebugActions,
  DeprecatedActions,
  DocumentActions,
  DOMActions,
  EventActions,
  FormActions,
  HistoryActions,
  NotificationActions,
  StorageActions,
  TurboActions,
  TurboProgressBarActions,
  TurboFrameActions,
} from "./actions"
export type { ActionGroup } from "./actions"

declare global {
  interface Window {
    Turbo: typeof Turbo & {
      navigator: {
        adapter: BrowserAdapter
      }
    }
  }
}

export function initialize(streamActions: TurboStreamActions, actionGroups?: readonly ActionGroup[]) {
  TurboMorph.initialize(streamActions)
  Actions.register(streamActions, actionGroups)
}

export function register(name: string, action: TurboStreamAction, streamActions: TurboStreamActions) {
  streamActions[name] = action
}

export default {
  initialize,
  register,
  Actions,
  Utils,
  ActionGroups: Actions.ActionGroups,
  allActionGroups: Actions.allActionGroups,
  ...Actions.ActionGroups,
}
