import { assert } from "@open-wc/testing"
import { Utils } from "../../"
const { tokenize } = Utils

describe("utils.tokenize", () => {
  context("null", () => {
    it("returns empty array", () => {
      assert.deepEqual(tokenize(null), [])
    })
  })

  context("empty string", () => {
    it("returns empty array", () => {
      assert.deepEqual(tokenize(""), [])
    })
  })

  context("string with no space", () => {
    it("returns tokenized array", () => {
      assert.deepEqual(tokenize("some"), ["some"])
    })
  })

  context("simple string", () => {
    it("returns tokenized array", () => {
      assert.deepEqual(tokenize("some thing"), ["some", "thing"])
    })
  })

  context("string with muliple spaces space", () => {
    it("returns tokenized array without empty entries", () => {
      assert.deepEqual(tokenize("some        thing      and     another"), ["some", "thing", "and", "another"])
    })
  })

  context("string with special characters", () => {
    it("returns tokenized array", () => {
      assert.deepEqual(tokenize("a_lot of-words with special--chars mixed__in"), [
        "a_lot",
        "of-words",
        "with",
        "special--chars",
        "mixed__in",
      ])
    })
  })
})
