import type {
  AnimationConfigWithData,
  AnimationDirection,
  AnimationEventName,
  AnimationItem,
  AnimationSegment,
  RendererType,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMDestroyEvent,
  BMEnterFrameEvent,
  BMSegmentStartEvent,
  AnimationEventCallback
} from 'lottie-web'
import React, { MutableRefObject, ReactElement, RefObject } from 'react'

export type LottieRefCurrentProps = {
  play: () => void
  stop: () => void
  pause: () => void
  setSpeed: (speed: number) => void
  goToAndStop: (value: number, isFrame?: boolean) => void
  goToAndPlay: (value: number, isFrame?: boolean) => void
  setDirection: (direction: AnimationDirection) => void
  playSegments: (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => void
  setSubframe: (useSubFrames: boolean) => void
  getDuration: (inFrames?: boolean) => number | undefined
  destroy: () => void
  animationContainerRef: RefObject<HTMLDivElement>
  animationLoaded: boolean
  animationItem: AnimationItem | undefined
}

export type LottieRef = MutableRefObject<LottieRefCurrentProps | null>

export type EventCallback = AnimationEventCallback<
  BMDestroyEvent | BMCompleteEvent | BMEnterFrameEvent | BMCompleteLoopEvent | BMSegmentStartEvent | undefined
>

export type LottieOptions<T extends RendererType = 'svg'> = Omit<
  AnimationConfigWithData<T>,
  'container' | 'animationData'
> & {
  animationData: unknown
  lottieRef?: LottieRef
  onComplete?: EventCallback | null
  onLoopComplete?: EventCallback | null
  onEnterFrame?: EventCallback | null
  onSegmentStart?: EventCallback | null
  onConfigReady?: EventCallback | null
  onDataReady?: EventCallback | null
  onDataFailed?: EventCallback | null
  onLoadedImages?: EventCallback | null
  onDOMLoaded?: EventCallback | null
  onDestroy?: EventCallback | null
} & Omit<React.HTMLProps<HTMLDivElement>, 'loop'>

export type PartialLottieOptions = Omit<LottieOptions, 'animationData'> & {
  animationData?: LottieOptions['animationData']
}

// Interactivity
export type Axis = 'x' | 'y'
export type Position = { [key in Axis]: number | [number, number] }

export type Action = {
  type: 'seek' | 'play' | 'stop' | 'loop'
  frames: [number] | [number, number]
  visibility?: [number, number]
  position?: Position
}

export type InteractivityProps = {
  lottieObj: { View: ReactElement } & LottieRefCurrentProps
  actions: Action[]
  mode: 'scroll' | 'cursor'
}

export type LottieComponentProps = LottieOptions & {
  interactivity?: Omit<InteractivityProps, 'lottieObj'>
}

export type PartialLottieComponentProps = Omit<LottieComponentProps, 'animationData'> & {
  animationData?: LottieOptions['animationData']
}

export type Listener = {
  name: AnimationEventName
  handler: EventCallback
}
export type PartialListener = Omit<Listener, 'handler'> & {
  handler?: Listener['handler'] | null
}
