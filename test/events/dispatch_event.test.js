import sinon from "sinon"
import { html, fixture, assert, oneEvent } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("dispatch_event")

describe("dispatch_event", () => {
  context("warnings", () => {
    afterEach(() => {
      sinon.restore()
    })

    it("should do nothing and print warning if attribute is empty", async () => {
      const spy = sinon.spy(console, "warn")

      await fixture('<div id="element"></div>')

      assert.equal(spy.callCount, 0)

      await executeStream('<turbo-stream action="dispatch_event" name="" target="element"></turbo-stream>')

      assert.equal(spy.callCount, 1)
      assert.equal(
        spy.firstCall.firstArg,
        '[TurboPower] no "name" provided for Turbo Streams operation "dispatch_event"'
      )
    })

    it('should do nothing and print warning if "attribute" attribute is missing', async () => {
      const spy = sinon.spy(console, "warn")

      await fixture('<div id="element"></div>')

      assert.equal(spy.callCount, 0)

      await executeStream('<turbo-stream action="dispatch_event" target="element"></turbo-stream>')

      assert.equal(spy.callCount, 1)
      assert.equal(
        spy.firstCall.firstArg,
        '[TurboPower] no "name" provided for Turbo Streams operation "dispatch_event"'
      )
    })

    it("should error out when detail is not valid json", async () => {
      const spy = sinon.spy(console, "error")

      await fixture('<div id="element"></div>')

      assert.equal(spy.callCount, 0)

      await executeStream(
        '<turbo-stream action="dispatch_event" name="my:event" target="element"><template>{ this is not valid }</template></turbo-stream>',
      )

      assert.equal(spy.callCount, 1)
      assert.equal(
        spy.firstCall.firstArg,
        '[TurboPower] error proccessing provided "detail" in "<template>" ("{ this is not valid }") for Turbo Streams operation "dispatch_event".',
      )
    })
  })

  context("target", () => {
    it("should dispatch event", async () => {
      const element = await fixture('<div id="element"></div>')

      setTimeout(() =>
        executeStream('<turbo-stream action="dispatch_event" name="my:event" target="element"></turbo-stream>'),
      )

      const { detail } = await oneEvent(element, "my:event")

      assert.deepEqual(detail, {})
    })

    it("should dispatch event with empty detail", async () => {
      const element = await fixture('<div id="element"></div>')

      setTimeout(() =>
        executeStream(
          '<turbo-stream action="dispatch_event" name="my:event" target="element"><template></template></turbo-stream>',
        ),
      )

      const { detail } = await oneEvent(element, "my:event")

      assert.deepEqual(detail, {})
    })

    it("should dispatch event with empty object in detail", async () => {
      const element = await fixture('<div id="element"></div>')

      setTimeout(() =>
        executeStream(
          '<turbo-stream action="dispatch_event" name="my:event" target="element"><tempalte>{}</template></turbo-stream>',
        ),
      )

      const { detail } = await oneEvent(element, "my:event")

      assert.deepEqual(detail, {})
    })

    it("should dispatch event with detail", async () => {
      const element = await fixture('<div id="element"></div>')

      const eventDetail = '{"number":1,"string":"string value","nested":{"deep":"value","boolean":true}}'

      setTimeout(() =>
        executeStream(
          `<turbo-stream action="dispatch_event" name="my:event" target="element"><template>${eventDetail}</template></turbo-stream>`,
        ),
      )

      const { detail } = await oneEvent(element, "my:event")

      assert.deepEqual(detail, {
        number: 1,
        string: "string value",
        nested: {
          deep: "value",
          boolean: true,
        },
      })
    })

    it("should bubble up the DOM tree", async () => {
      await fixture(html`
        <div id="outer-parent">
          <div id="parent">
            <div id="element"></div>
          </div>
        </div>
      `)

      const outerParent = document.querySelector("#outer-parent")

      setTimeout(() =>
        executeStream('<turbo-stream action="dispatch_event" name="my:event" target="element"></turbo-stream>'),
      )

      const { detail } = await oneEvent(outerParent, "my:event")

      assert.deepEqual(detail, {})
    })
  })

  context("targets", () => {
    it("should dispatch event", async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      const element1 = document.querySelector("#element1")
      const element2 = document.querySelector("#element2")
      const element3 = document.querySelector("#element3")

      setTimeout(() =>
        executeStream('<turbo-stream action="dispatch_event" name="my:event" targets="div"></turbo-stream>'),
      )

      const listener1 = oneEvent(element1, "my:event")
      const listener2 = oneEvent(element2, "my:event")
      const listener3 = oneEvent(element3, "my:event")

      const [event1, event2, event3] = await Promise.all([listener1, listener2, listener3])

      assert.deepEqual(event1.detail, {})
      assert.deepEqual(event2.detail, {})
      assert.deepEqual(event3.detail, {})
    })

    it("should dispatch event with empty detail", async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      const element1 = document.querySelector("#element1")
      const element2 = document.querySelector("#element2")
      const element3 = document.querySelector("#element3")

      setTimeout(() =>
        executeStream(
          '<turbo-stream action="dispatch_event" name="my:event" targets="div"><template></template></turbo-stream>',
        ),
      )

      const listener1 = oneEvent(element1, "my:event")
      const listener2 = oneEvent(element2, "my:event")
      const listener3 = oneEvent(element3, "my:event")

      const [event1, event2, event3] = await Promise.all([listener1, listener2, listener3])

      assert.deepEqual(event1.detail, {})
      assert.deepEqual(event2.detail, {})
      assert.deepEqual(event3.detail, {})
    })

    it("should dispatch event with empty object in detail", async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      const element1 = document.querySelector("#element1")
      const element2 = document.querySelector("#element2")
      const element3 = document.querySelector("#element3")

      setTimeout(() =>
        executeStream(
          '<turbo-stream action="dispatch_event" name="my:event" targets="div"><template>{}</template></turbo-stream>',
        ),
      )

      const listener1 = oneEvent(element1, "my:event")
      const listener2 = oneEvent(element2, "my:event")
      const listener3 = oneEvent(element3, "my:event")

      const [event1, event2, event3] = await Promise.all([listener1, listener2, listener3])

      assert.deepEqual(event1.detail, {})
      assert.deepEqual(event2.detail, {})
      assert.deepEqual(event3.detail, {})
    })

    it("should dispatch event with detail", async () => {
      await fixture(html`
        <div id="element1"></div>
        <div id="element2"></div>
        <div id="element3"></div>
      `)

      const element1 = document.querySelector("#element1")
      const element2 = document.querySelector("#element2")
      const element3 = document.querySelector("#element3")

      const eventDetail = '{"number":1,"string":"string value","nested":{"deep":"value","boolean":true}}'
      const expectedDetail = {
        number: 1,
        string: "string value",
        nested: {
          deep: "value",
          boolean: true,
        },
      }

      setTimeout(() =>
        executeStream(
          `<turbo-stream action="dispatch_event" name="my:event" targets="div"><template>${eventDetail}</template></turbo-stream>`,
        ),
      )

      const listener1 = oneEvent(element1, "my:event")
      const listener2 = oneEvent(element2, "my:event")
      const listener3 = oneEvent(element3, "my:event")

      const [event1, event2, event3] = await Promise.all([listener1, listener2, listener3])

      assert.deepEqual(event1.detail, expectedDetail)
      assert.deepEqual(event2.detail, expectedDetail)
      assert.deepEqual(event3.detail, expectedDetail)
    })
  })
})
