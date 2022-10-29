import { StreamElement, TurboStreamActions, FrameElement } from "@hotwired/turbo"

export function turbo_frame_reload(this: StreamElement) {
  this.targetElements.forEach((element: FrameElement) => element.reload())
}

export function turbo_frame_set_src(this: StreamElement) {
  const src = this.getAttribute("src")
  this.targetElements.forEach((element: FrameElement) => (element.src = src))
}

export function registerTurboFrameActions(streamActions: TurboStreamActions) {
  streamActions.turbo_frame_reload = turbo_frame_reload
  streamActions.turbo_frame_set_src = turbo_frame_set_src
}
