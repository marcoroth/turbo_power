import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("invoke")

describe("invoke", () => {
  it("show deprecation warning", async () => {
    const fake = sinon.replace(console, "warn", sinon.fake())
    const expectedWarning =
      "[TurboPower] The `invoke` Turbo Stream Action was removed from TurboPower. If you'd like to continue using this action please use the successor library instead. Read more here: https://github.com/hopsoft/turbo_boost-streams"

    assert.equal(fake.callCount, 0)

    await executeStream('<turbo-stream action="invoke"></turbo-stream>')

    assert.equal(fake.callCount, 1)
    assert.equal(fake.firstArg, expectedWarning)
  })
})
