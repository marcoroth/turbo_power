import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function reset_form(this: StreamElement) {
  this.targetElements.forEach((form: HTMLFormElement) => form.reset())
}

export function input_select(this: StreamElement) {
  this.targetElements.forEach((input: HTMLInputElement) => input.select())
}

export function registerFormActions(streamActions: TurboStreamActions) {
  streamActions.reset_form = reset_form
  streamActions.input_select = input_select
}
