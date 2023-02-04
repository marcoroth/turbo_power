import sinon from "sinon"
import { assert } from "@open-wc/testing"
import { executeStream, registerAction } from "../test_helpers"

registerAction("notification")

function notificationSpy() {
  return sinon.spy(window, "Notification")
}

describe("notification", () => {
  afterEach(() => {
    sinon.restore()
  })

  it("should create the notification, title only", async () => {
    const spy = notificationSpy()

    await executeStream(
      `<turbo-stream
        action="notification"
        title="May I have your attention..."
        ></turbo-stream>`
    )

    assert.equal(spy.callCount, 1)
    assert.equal(spy.firstCall.firstArg, "May I have your attention...")
    assert.equal(spy.firstCall.secondArg, null)
  })

  it("should create the notification, title and options", async () => {
    const spy = notificationSpy()

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
        ></turbo-stream>`
    )

    assert.equal(spy.callCount, 1)
    assert.equal(spy.firstCall.firstArg, "May I have your attention...")
    assert.deepEqual(spy.firstCall.args[1], {
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
    })
  })

  it.skip("should create the notification, title and options that are supported using ServiceWorkers", async () => {
    const spy = notificationSpy()

    await executeStream(
      `<turbo-stream
        action="notification"
        title="May I have your attention..."
        actions='[{"action": "respond", "title": "Please respond", "icon": "https://example.com/icon.png"}]'
        silent="true"
        ></turbo-stream>`
    )

    assert.equal(spy.callCount, 1)
    assert.equal(spy.firstCall.firstArg, "May I have your attention...")
    assert.deepEqual(spy.firstCall.args[1], {
      actions: [{ action: "respond", title: "Please respond", icon: "https://example.com/icon.png" }],
      silent: true,
    })
  })
})
