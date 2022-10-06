declare module "turbo_ready" {
  import { TurboStreamActions } from "@hotwired/turbo"
  export function initialize(actions: TurboStreamActions): void
}
