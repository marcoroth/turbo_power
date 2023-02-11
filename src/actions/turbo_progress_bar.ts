import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function turbo_progress_bar_set_value(this: StreamElement) {
  const value = this.getAttribute("value") || 0

  window.Turbo.navigator.adapter.progressBar.setValue(Number(value))
}

export function turbo_progress_bar_show(this: StreamElement) {
  window.Turbo.navigator.adapter.progressBar.show()
}

export function turbo_progress_bar_hide(this: StreamElement) {
  window.Turbo.navigator.adapter.progressBar.hide()
}

export function registerTurboProgressBarActions(streamActions: TurboStreamActions) {
  streamActions.turbo_progress_bar_set_value = turbo_progress_bar_set_value
  streamActions.turbo_progress_bar_show = turbo_progress_bar_show
  streamActions.turbo_progress_bar_hide = turbo_progress_bar_hide
}
