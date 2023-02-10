import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("notification")

describe("notification", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("grants permission after default", async () => {
    const stub = sinon.stub(window, "Notification")
    sinon.stub(Notification, "permission").value("default")
    sinon.stub(Notification, "requestPermission").resolves("granted")

    await executeStream(`<turbo-stream action="notification"></turbo-stream>`)

    assert.equal(stub.callCount, 1)
  })

  it("rejects permission after default", async () => {
    const stub = sinon.stub(window, "Notification")
    sinon.stub(Notification, "permission").value("default")
    sinon.stub(Notification, "requestPermission").resolves("denied")

    await executeStream(`<turbo-stream action="notification" ></turbo-stream>`)

    assert.equal(stub.callCount, 0)
  })

  it("creates no notification if denied", async () => {
    const stub = sinon.stub(window, "Notification")
    sinon.stub(Notification, "permission").value("denied")

    await executeStream(`<turbo-stream action="notification" ></turbo-stream>`)

    assert.equal(stub.callCount, 0)
  })

  it("creates the notifiaction if granted", async () => {
    const stub = sinon.stub(window, "Notification")
    sinon.stub(Notification, "permission").value("granted")

    await executeStream(
      `<turbo-stream
        action="notification"
        title="May I have your attention..."
        ></turbo-stream>`
    )

    assert.equal(stub.callCount, 1)
    assert.equal(stub.firstCall.firstArg, "May I have your attention...")
    assert.equal(stub.firstCall.secondArg, null)
  })

  it("should create the notification, title and options", async () => {
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
        ></turbo-stream>`
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
      data: '{"arbitrary": "data"}',
      vibrate: [200, 100, 200],
      renotify: true,
      requireInteraction: true,
      actions: [{ action: "respond", title: "Please respond", icon: "https://example.com/icon.png" }],
      silent: true,
    })
  })

  it("handles if Notification is not available", async () => {
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
