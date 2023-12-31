import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function reload(this: StreamElement) {
  window.location.reload()
}

export function scroll_into_view(this: StreamElement) {
  const alignToTop = this.getAttribute("align-to-top")
  const block = this.getAttribute("block") as ScrollLogicalPosition
  const inline = this.getAttribute("inline") as ScrollLogicalPosition
  const behavior = this.getAttribute("behavior") as ScrollBehavior

  if (alignToTop) {
    const val = JSON.parse(alignToTop)
    this.targetElements.forEach((element: Element) => element.scrollIntoView(val))
  } else if (block || inline || behavior) {
    this.targetElements.forEach((element: Element) =>
      element.scrollIntoView({
        block: block || "start",
        inline: inline || "nearest",
        behavior: behavior || "auto",
      }),
    )
  } else {
    this.targetElements.forEach((element: Element) => element.scrollIntoView())
  }
}

export function set_focus(this: StreamElement) {
  this.targetElements.forEach((element: HTMLElement) => element.focus())
}

export function set_title(this: StreamElement) {
  const title = this.getAttribute("title") || ""
  let titleElement = document.head.querySelector("title")

  if (!titleElement) {
    titleElement = document.createElement("title")
    document.head.appendChild(titleElement)
  }

  titleElement.textContent = title
}

export function registerBrowserActions(streamActions: TurboStreamActions) {
  streamActions.reload = reload
  streamActions.scroll_into_view = scroll_into_view
  streamActions.set_focus = set_focus
  streamActions.set_title = set_title
}
