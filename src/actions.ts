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
import * as TurboProgressBar from "./actions/turbo_progress_bar"
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
export * from "./actions/turbo_progress_bar"
export * from "./actions/turbo_frame"

export interface ActionGroup {
  register(streamActions: TurboStreamActions): void
}

export const ActionGroups = {
  AttributeActions: { register: Attributes.registerAttributesActions },
  BrowserActions: { register: Browser.registerBrowserActions },
  DebugActions: { register: Debug.registerDebugActions },
  DeprecatedActions: { register: Deprecated.registerDeprecatedActions },
  DocumentActions: { register: Document.registerDocumentActions },
  DOMActions: { register: DOM.registerDOMActions },
  EventActions: { register: Events.registerEventsActions },
  FormActions: { register: Form.registerFormActions },
  HistoryActions: { register: History.registerHistoryActions },
  NotificationActions: { register: Notification.registerNotificationActions },
  StorageActions: { register: Storage.registerStorageActions },
  TurboActions: { register: Turbo.registerTurboActions },
  TurboProgressBarActions: { register: TurboProgressBar.registerTurboProgressBarActions },
  TurboFrameActions: { register: TurboFrame.registerTurboFrameActions },
} satisfies Record<string, ActionGroup>

export const {
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
} = ActionGroups

export const allActionGroups: readonly ActionGroup[] = Object.freeze(Object.values(ActionGroups))

export function register(streamActions: TurboStreamActions, actionGroups: readonly ActionGroup[] = allActionGroups) {
  actionGroups.forEach((group) => group.register(streamActions))
}
