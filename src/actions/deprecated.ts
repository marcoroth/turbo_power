import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

export function invoke(this: StreamElement) {
  console.warn(
    "[TurboPower] The `invoke` Turbo Stream Action was removed from TurboPower. If you'd like to continue using this action please use the successor library instead. Read more here: https://github.com/hopsoft/turbo_boost-streams"
  )
}

export function registerDeprecatedActions(streamActions: TurboStreamActions) {
  if (!streamActions.invoke) {
    streamActions.invoke = invoke
  }
}
