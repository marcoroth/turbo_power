import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("notification")

describe("notification", () => {
  afterEach(() => {
    sinon.restore()
  })

  context("Notification is not supported", () => {
    it("alerts with a message", async () => {
      const stub = sinon.stub(window, "Notification").value(undefined)
      const mock = sinon
        .mock(window)
        .expects("alert")
        .once()
        .withArgs("This browser does not support desktop notification")

      await executeStream(`<turbo-stream action="notification"></turbo-stream>`)
      assert.equal(stub.callCount, 0)
      mock.verify()
    })
  })

  context("requestPermission is required", () => {
    it("permission is granted", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("default")
      sinon.stub(Notification, "requestPermission").resolves("granted")

      await executeStream(`<turbo-stream action="notification"></turbo-stream>`)

      assert.equal(stub.callCount, 1)
    })

    it("permission is denied", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("default")
      sinon.stub(Notification, "requestPermission").resolves("denied")

      await executeStream(`<turbo-stream action="notification" ></turbo-stream>`)

      assert.equal(stub.callCount, 0)
    })
  })

  context("permission was denied", () => {
    it("creates no notification", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("denied")

      await executeStream(`<turbo-stream action="notification" ></turbo-stream>`)

      assert.equal(stub.callCount, 0)
    })
  })

  context("permission was granted", () => {
    it("creates the notification with title only", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("granted")

      await executeStream(
        `<turbo-stream
          action="notification"
          title="May I have your attention..."
          ></turbo-stream>`,
      )

      assert.equal(stub.callCount, 1)
      assert.equal(stub.firstCall.firstArg, "May I have your attention...")
      assert.equal(stub.firstCall.secondArg, null)
    })

    it("creates the notification with title and options", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("granted")

      await executeStream(
        `<turbo-stream
          action="notification"
          title="May I have your attention..."
          dir="ltr"
          lang="EN"
          badge="https://example.com/badge.png"
          body="This is displayed below the title."
          tag="Demo"
          icon="https://example.com/icon.png"
          image="https://example.com/image.png"
          data='{"arbitrary": "data"}'
          vibrate="[200, 100, 200]"
          renotify="true"
          require-interaction="true"
          actions='[{"action": "respond", "title": "Please respond", "icon": "https://example.com/icon.png"}]'
          silent="true"
          ></turbo-stream>`,
      )

      assert.equal(stub.callCount, 1)
      assert.equal(stub.firstCall.firstArg, "May I have your attention...")
      assert.deepEqual(stub.firstCall.args[1], {
        dir: "ltr",
        lang: "EN",
        badge: "https://example.com/badge.png",
        body: "This is displayed below the title.",
        tag: "Demo",
        icon: "https://example.com/icon.png",
        image: "https://example.com/image.png",
        data: { arbitrary: "data" },
        vibrate: [200, 100, 200],
        renotify: true,
        requireInteraction: true,
        actions: [{ action: "respond", title: "Please respond", icon: "https://example.com/icon.png" }],
        silent: true,
      })
    })

    it("creates the notification with title and escaped options", async () => {
      const stub = sinon.stub(window, "Notification")
      sinon.stub(Notification, "permission").value("granted")

      await executeStream(
        `<turbo-stream
          title="May I have your attention..."
          dir="ltr"
          lang="EN"
          badge="https://example.com/badge.png"
          body="This is displayed below the title."
          tag="Demo" icon="https://example.com/icon.png"
          image="https://example.com/image.png"
          data="{&quot;arbitrary&quot;:&quot;data&quot;}"
          vibrate="[200,100,200]"
          renotify="true"
          require-interaction="true"
          actions="[{&quot;action&quot;:&quot;respond&quot;,&quot;title&quot;:&quot;Please respond&quot;,&quot;icon&quot;:&quot;https://example.com/icon.png&quot;}]"
          silent="true"
          action="notification"
        ></turbo-stream>`,
      )

      assert.equal(stub.callCount, 1)
      assert.equal(stub.firstCall.firstArg, "May I have your attention...")
      assert.deepEqual(stub.firstCall.args[1], {
        dir: "ltr",
        lang: "EN",
        badge: "https://example.com/badge.png",
        body: "This is displayed below the title.",
        tag: "Demo",
        icon: "https://example.com/icon.png",
        image: "https://example.com/image.png",
        data: { arbitrary: "data" },
        vibrate: [200, 100, 200],
        renotify: true,
        requireInteraction: true,
        actions: [{ action: "respond", title: "Please respond", icon: "https://example.com/icon.png" }],
        silent: true,
      })
    })
  })
})
