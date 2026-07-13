import type { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function reset_form(this: StreamElement) {
  this.targetElements.forEach((form: Element) => (form as HTMLFormElement).reset())
}

export function registerFormActions(streamActions: TurboStreamActions) {
  streamActions.reset_form = reset_form
}
