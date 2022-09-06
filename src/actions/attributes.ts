import { StreamElement } from "@hotwired/turbo/dist/types/elements/stream_element"
import { TurboStreamActions } from "../types"

import { camelize } from '../utils'

export function add_css_class(this: StreamElement) {
  const classes = (this.getAttribute("classes")?.split(" ") || []).filter(c => c.length > 0)

  if (classes.length > 0) {
    this.targetElements.forEach((element: Element) => element.classList.add(...classes))
  } else {
    console.warn(`[TurboPower] no "classes" provided for Turbo Streams operation "add_css_class"`)
  }
}

export function remove_attribute(this: StreamElement) {
  const attribute = this.getAttribute("attribute")

  if (attribute) {
    this.targetElements.forEach((element: Element) => element.removeAttribute(attribute))
  } else {
    console.warn(`[TurboPower] no "attribute" provided for Turbo Streams operation "remove_attribute"`)
  }
}

export function remove_css_class(this: StreamElement) {
  const classes = (this.getAttribute("classes")?.split(" ") || []).filter(c => c.length > 0)

  if (classes.length > 0) {
    this.targetElements.forEach((element: Element) => element.classList.remove(...classes))
  } else {
    console.warn(`[TurboPower] no "classes" provided for Turbo Streams operation "remove_css_class"`)
  }
}

export function set_attribute(this: StreamElement) {
  const attribute = this.getAttribute("attribute")
  const value = this.getAttribute("value") || ""

  if (attribute) {
    this.targetElements.forEach((element: Element) => element.setAttribute(attribute, value))
  } else {
    console.warn(`[TurboPower] no "attribute" provided for Turbo Streams operation "set_attribute"`)
  }
}

export function set_dataset_attribute(this: StreamElement) {
  const attribute = this.getAttribute("attribute")
  const value = this.getAttribute("value") || ""

  if (attribute) {
    this.targetElements.forEach((element: HTMLElement) => element.dataset[camelize(attribute)] = value)
  } else {
    console.warn(`[TurboPower] no "attribute" provided for Turbo Streams operation "set_dataset_attribute"`)
  }
}

export function set_property(this: StreamElement) {
  const name = this.getAttribute("name")

  if (name) {
    // @ts-ignore
    this.targetElements.forEach((element: Element) => element[name] = value)
  } else {
    console.error(`[TurboPower] no "name" provided for Turbo Streams operation "set_property"`)
  }
}

export function set_style(this: StreamElement) {
  const name = this.getAttribute("name")
  const value = this.getAttribute("value") || ""

  if (name) {
    // @ts-ignore
    this.targetElements.forEach((element: HTMLElement) => element.style[name] = value)
  } else {
    console.error(`[TurboPower] no "name" provided for Turbo Streams operation "set_style"`)
  }
}

export function set_styles(this: StreamElement) {
  const styles = this.getAttribute("styles") || ""

  this.targetElements.forEach((element: HTMLElement) => element.setAttribute("style", styles))
}

export function set_value(this: StreamElement) {
  const value = this.getAttribute("value") || ""

  this.targetElements.forEach((element: HTMLInputElement) => element.value = value)
}

export function registerAttributesActions(streamActions: TurboStreamActions) {
  streamActions.add_css_class = add_css_class
  streamActions.remove_css_class = remove_css_class
  streamActions.remove_attribute = remove_attribute
  streamActions.set_attribute = set_attribute
  streamActions.set_dataset_attribute = set_dataset_attribute
  streamActions.set_property = set_property
  streamActions.set_style = set_style
  streamActions.set_styles = set_styles
  streamActions.set_value = set_value
}
