declare global {
  interface Window {
    TurboPowerLocation: typeof window.location
  }
}

export default {
  get location() {
    return window.TurboPowerLocation || window.location;
  }
}
