import { assert } from "@open-wc/testing"
import TurboPower from "../../"

describe("registerHistoryActions", () => {
  it("registers all history actions", () => {
    const streamActions = {}
    const actionNames = ["push_state", "replace_state", "history_back", "history_forward", "history_go"]

    TurboPower.Actions.registerHistoryActions(streamActions)

    actionNames.forEach((name) => {
      assert.typeOf(streamActions[name], "function", `${name} not registered`)
    })
  })
})
