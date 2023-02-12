export function camelize(value: string) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase())
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function dasherize(value: string) {
  return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`)
}

export function tokenize(value: string | null) {
  return value ? value.match(/[^\s]+/g) || [] : []
}

export function typecast(value: string) {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}
