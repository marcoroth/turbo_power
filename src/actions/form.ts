import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function reset_form(this: StreamElement) {
  this.targetElements.forEach((form: HTMLFormElement) => form.reset())
}

export function registerFormActions(streamActions: TurboStreamActions) {
  streamActions.reset_form = reset_form
}
