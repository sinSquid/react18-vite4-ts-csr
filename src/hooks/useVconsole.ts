import VConsole from 'vconsole'

export function useVConsole() {
  let vConsole
  if (!window.VCONSOLE_INIT && window.location.href.includes('#vc')) {
    window.VCONSOLE_INIT = true
    vConsole = new VConsole({ theme: 'dark', log: { maxLogNumber: 1000 } })
  }
  return vConsole
}
