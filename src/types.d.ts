import { StreamElement } from "@hotwired/turbo/dist/types/elements/stream_element"

export type TurboStreamAction = (this: StreamElement) => void
export type TurboStreamActions = { [action: string]: TurboStreamAction }

declare global {
  interface Window {
    Turbo: any;
    Turbolinks: any;
  }
}
