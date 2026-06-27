import { assert } from "@open-wc/testing"
import TurboPower, { ActionGroups, allActionGroups, AttributeActions, BrowserActions } from "../../"

const ALL_GROUP_NAMES = [
  "AttributeActions",
  "BrowserActions",
  "DebugActions",
  "DeprecatedActions",
  "DocumentActions",
  "DOMActions",
  "EventActions",
  "FormActions",
  "HistoryActions",
  "NotificationActions",
  "StorageActions",
  "TurboActions",
  "TurboProgressBarActions",
  "TurboFrameActions",
]

describe("initialize", () => {
  it("registers all action groups when none are specified", () => {
    const streamActions = {}

    TurboPower.initialize(streamActions)

    assert.isFunction(streamActions.add_css_class, "attribute action")
    assert.isFunction(streamActions.reload, "browser action")
    assert.isFunction(streamActions.console_log, "debug action")
    assert.isFunction(streamActions.dispatch_event, "event action")
    assert.isFunction(streamActions.notification, "notification action")
    assert.isFunction(streamActions.morph, "morph action")
  })

  it("registers only the provided action groups", () => {
    const streamActions = {}

    TurboPower.initialize(streamActions, [AttributeActions, BrowserActions])

    assert.isFunction(streamActions.add_css_class, "attribute action is registered")
    assert.isFunction(streamActions.reload, "browser action is registered")

    assert.isUndefined(streamActions.console_log, "debug action is not registered")
    assert.isUndefined(streamActions.dispatch_event, "event action is not registered")
    assert.isUndefined(streamActions.notification, "notification action is not registered")
  })

  it("registers no action groups when an empty array is provided", () => {
    const streamActions = {}

    TurboPower.initialize(streamActions, [])

    assert.isUndefined(streamActions.add_css_class)
    assert.isUndefined(streamActions.reload)

    // morph is always registered via turbo-morph
    assert.isFunction(streamActions.morph)
  })
})

describe("Actions.register", () => {
  it("can be called directly with a subset of action groups", () => {
    const streamActions = {}

    TurboPower.Actions.register(streamActions, [AttributeActions])

    assert.isFunction(streamActions.add_css_class, "attribute action is registered")
    assert.isUndefined(streamActions.reload, "browser action is not registered")
  })
})

describe("each action group registers its own actions", () => {
  // One representative action per group. Guards against a group being wired
  // to the wrong register function (a mis-mapping would otherwise pass).
  const REPRESENTATIVE_ACTIONS = {
    AttributeActions: "add_css_class",
    BrowserActions: "reload",
    DebugActions: "console_log",
    DeprecatedActions: "invoke",
    DocumentActions: "set_cookie",
    DOMActions: "graft",
    EventActions: "dispatch_event",
    FormActions: "reset_form",
    HistoryActions: "push_state",
    NotificationActions: "notification",
    StorageActions: "clear_storage",
    TurboActions: "redirect_to",
    TurboProgressBarActions: "turbo_progress_bar_set_value",
    TurboFrameActions: "turbo_frame_reload",
  }

  Object.entries(REPRESENTATIVE_ACTIONS).forEach(([groupName, actionName]) => {
    it(`${groupName} registers ${actionName}`, () => {
      const streamActions = {}

      TurboPower.Actions.register(streamActions, [ActionGroups[groupName]])

      assert.isFunction(streamActions[actionName], `${groupName} registers ${actionName}`)
    })
  })
})

describe("action group exports", () => {
  it("exposes every action group on the default export", () => {
    ALL_GROUP_NAMES.forEach((name) => {
      assert.isObject(TurboPower[name], `${name} is on the default export`)
      assert.isFunction(TurboPower[name].register, `${name}.register is a function`)
    })
  })

  it("keeps named exports identical to the default export members", () => {
    assert.strictEqual(TurboPower.AttributeActions, AttributeActions)
    assert.strictEqual(TurboPower.BrowserActions, BrowserActions)
  })

  it("includes every action group in allActionGroups", () => {
    assert.strictEqual(allActionGroups.length, ALL_GROUP_NAMES.length)
    ALL_GROUP_NAMES.forEach((name) => {
      assert.include(allActionGroups, ActionGroups[name], `allActionGroups includes ${name}`)
    })
  })

  it("exposes the same allActionGroups on the default export", () => {
    assert.strictEqual(TurboPower.allActionGroups, allActionGroups)
  })
})
