import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

import { camelize, typecast, tokenize } from "../utils"

type TargetElement = { [key: string]: any }

export function add_css_class(this: StreamElement) {
  const classes = tokenize(this.getAttribute("classes"))

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
  const classes = tokenize(this.getAttribute("classes"))

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
    this.targetElements.forEach((element: HTMLElement) => (element.dataset[camelize(attribute)] = value))
  } else {
    console.warn(`[TurboPower] no "attribute" provided for Turbo Streams operation "set_dataset_attribute"`)
  }
}

export function set_property(this: StreamElement) {
  const name = this.getAttribute("name")
  const value = typecast(this.getAttribute("value") || "")

  if (name) {
    this.targetElements.forEach((element: TargetElement) => (element[name] = value))
  } else {
    console.error(`[TurboPower] no "name" provided for Turbo Streams operation "set_property"`)
  }
}

export function set_style(this: StreamElement) {
  const name = this.getAttribute("name")
  const value = this.getAttribute("value") || ""

  if (name) {
    this.targetElements.forEach((element: TargetElement) => (element.style[name] = value))
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

  this.targetElements.forEach((element: HTMLInputElement) => (element.value = value))
}

export function toggle_css_class(this: StreamElement) {
  const classes = tokenize(this.getAttribute("classes"))

  if (classes.length > 0) {
    this.targetElements.forEach((element: Element) => {
      classes.forEach((className: string) => element.classList.toggle(className))
    })
  } else {
    console.warn(`[TurboPower] no "classes" provided for Turbo Streams operation "toggle_css_class"`)
  }
}

export function replace_css_class(this: StreamElement) {
  const from = this.getAttribute("from") || ""
  const to = this.getAttribute("to") || ""

  if (from && to) {
    this.targetElements.forEach((element: HTMLElement) => element.classList.replace(from, to))
  } else {
    console.warn(`[TurboPower] no "from" or "to" class provided for Turbo Streams operation "replace_css_class"`)
  }
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
  streamActions.toggle_css_class = toggle_css_class
  streamActions.replace_css_class = replace_css_class
}
