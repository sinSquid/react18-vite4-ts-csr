export {}

declare global {
  interface Window {
    VCONSOLE_INIT: any
    CUSTOM_EVENT_BUS: any
  }
}

declare module '*.lottie' {
  const src: string
  export default src
}
