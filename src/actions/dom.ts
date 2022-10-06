import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function graft(this: StreamElement) {
  const selector = this.getAttribute("parent")

  if (selector) {
    const parent = document.querySelector(selector)

    if (parent) {
      this.targetElements.forEach((element: Element) => parent.appendChild(element))
    } else {
      console.error(
        `[TurboPower] couldn't find parent element using selector "${selector}" for Turbo Streams operation "graft"`
      )
    }
  } else {
    console.error(`[TurboPower] no "parent" selector provided for Turbo Streams operation "graft"`)
  }
}

export function inner_html(this: StreamElement) {
  const html = this.templateContent.textContent || ""

  this.targetElements.forEach((element: Element) => (element.innerHTML = html))
}

export function insert_adjacent_html(this: StreamElement) {
  const position = (this.getAttribute("position") || "beforebegin") as InsertPosition
  const html = this.templateContent.textContent || ""

  this.targetElements.forEach((element: Element) => element.insertAdjacentHTML(position, html))
}

export function insert_adjacent_text(this: StreamElement) {
  const position = (this.getAttribute("position") || "beforebegin") as InsertPosition
  const message = this.getAttribute("text") || ""

  this.targetElements.forEach((element: Element) => element.insertAdjacentText(position, message))
}

export function outer_html(this: StreamElement) {
  const html = this.templateContent.textContent || ""

  this.targetElements.forEach((element: Element) => (element.outerHTML = html))
}

export function set_meta(this: StreamElement) {
  const name = this.getAttribute("name")
  const content = this.getAttribute("content") || ""

  if (name) {
    let meta: HTMLMetaElement | null = document.head.querySelector(`meta[name='${name}']`)

    if (!meta) {
      meta = document.createElement("meta")
      meta.name = name
      document.head.appendChild(meta)
    }

    meta.content = content
  } else {
    console.error(`[TurboPower] no "name" provided for Turbo Streams operation "set_meta"`)
  }
}

export function text_content(this: StreamElement) {
  const text = this.getAttribute("text") || ""

  this.targetElements.forEach((element: Element) => (element.textContent = text))
}

export function registerDOMActions(streamActions: TurboStreamActions) {
  streamActions.graft = graft
  streamActions.inner_html = inner_html
  streamActions.insert_adjacent_html = insert_adjacent_html
  streamActions.insert_adjacent_text = insert_adjacent_text
  streamActions.outer_html = outer_html
  streamActions.text_content = text_content
  streamActions.set_meta = set_meta
}
