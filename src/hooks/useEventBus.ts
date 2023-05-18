interface anyContent {
  [key: string | symbol | number]: any
}

export default function useEventBus(scope = 'CUSTOM_EVENT_BUS', initialState = {}) {
  const symbolScope = Symbol.for(scope)
  if ((window as anyContent)[symbolScope]) {
    return (window as anyContent)[symbolScope]
  }
  const bus: anyContent = {
    state: { ...initialState },
    Observer: new Map(),
    emit(fn: string, args = []) {
      if (this[fn] && typeof this[fn] === 'function') {
        this[fn](...args)
        const ofn = this.Observer.get(fn)
        if (ofn && typeof ofn === 'function') {
          ofn()
        }
      }
    },
    on(fn: string, func: () => void) {
      if (func && typeof func === 'function') {
        this.Observer.set(fn, func)
      }
    },
    init(fn: string, func: () => void) {
      if (func && typeof func === 'function') {
        this[fn] = func
      }
    }
  }
  Object.defineProperty(window, symbolScope, {
    value: bus,
    writable: true
  })
  return bus
}
