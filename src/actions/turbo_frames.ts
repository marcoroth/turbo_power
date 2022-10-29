import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

// turbo_stream.set_turbo_frame_src(frame_id, src)
export function set_turbo_frame_src(this: StreamElement) {
  const frameId = this.getAttribute("frame_id") || ""
  const srcAttribute = this.getAttribute("src") || ""
  const frame = document.getElementById(frameId)

  if (frame && srcAttribute) {
    frame.setAttribute("src", srcAttribute)
  } else if (frame) {
    console.error(`[TurboPower] no "src" provided for Turbo Streams operation "set_turbo_frame_src"`)
  } else {
    console.error(
      `[TurboPower] couldn't find a TurboFrame with the ID: "${frameId}", for Turbo Streams operation "set_turbo_frame_src"`
    )
  }
}

export function registerTurboFramesActions(streamActions: TurboStreamActions) {
  streamActions.set_turbo_frame_src = set_turbo_frame_src
}
