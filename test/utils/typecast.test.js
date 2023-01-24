import { assert } from "@open-wc/testing"
import { Utils } from "../../"
const { typecast } = Utils

describe("utils.typecast", () => {
  context("Number", () => {
    it("casts integer value", () => {
      assert.equal(typecast("123"), 123)
    })

    it("casts float value", () => {
      assert.equal(typecast("123.123"), 123.123)
    })
  })

  context("String", () => {
    it("casts string", () => {
      assert.equal(typecast('"Hello World"'), "Hello World")
    })
  })

  context("Boolean", () => {
    it("casts true", () => {
      assert.equal(typecast("true"), true)
    })

    it("casts false", () => {
      assert.equal(typecast("false"), false)
    })
  })

  context("Object", () => {
    it("casts", () => {
      assert.deepEqual(typecast('{ "name": "John Doe", "age": 42, "alive": true }'), {
        name: "John Doe",
        age: 42,
        alive: true,
      })
    })
  })

  context("Array", () => {
    it("casts", () => {
      assert.deepEqual(typecast("[1, 2, 3, 4]"), [1, 2, 3, 4])
    })
  })

  context("catch", () => {
    it("defaults to string value on error", () => {
      assert.equal(typecast("Hello World"), "Hello World")
      assert.equal(typecast("{ abc: 123 }"), "{ abc: 123 }")
      assert.equal(typecast("[foo, bar, baz]"), "[foo, bar, baz]")
    })
  })
})
