import { StreamElement, TurboStreamActions } from "@hotwired/turbo"

// turbo_stream.console_log(message, level = :log)
export function console_log(this: StreamElement) {
  type ConsoleLevel = "log" | "info" | "warn" | "debug" | "error"

  const message = this.getAttribute("message")
  const level = (this.getAttribute("level") || "log") as ConsoleLevel

  console[level](message)
}

// turbo_stream.console_table(data, columns)
export function console_table(this: StreamElement) {
  const data = JSON.parse(this.getAttribute("data") || "[]")
  const columns = JSON.parse(this.getAttribute("columns") || "[]")

  console.table(data, columns)
}

export function registerDebugActions(streamActions: TurboStreamActions) {
  streamActions.console_log = console_log
  streamActions.console_table = console_table
}
