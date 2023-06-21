export type VideoOption = {
  src: string
  autoplay: boolean
  loop: boolean
  canvas: HTMLCanvasElement | null
  width: number
  height: number
  onPlay?: () => void
  onError?: () => void
  onEnd?: () => void
}


export type InstructionOption = {
  ins: string
  lazy: number
  next: string
  loop?: boolean
}
