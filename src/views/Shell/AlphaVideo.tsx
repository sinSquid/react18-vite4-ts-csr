import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import PT from 'prop-types'
import type { VideoOption, InstructionOption } from '#@views/Shell/type'
import { MP4_SRC } from '#@views/Shell/constant'

const defaultOption: VideoOption = {
  src: '',
  autoplay: false,
  loop: true,
  canvas: null,
  width: 375,
  height: 550
}

class WebGLVideo {
  timer: number | null = null

  playing = false

  options: VideoOption

  video: HTMLVideoElement | null = null

  canvas: HTMLCanvasElement | null = null

  graphics: CanvasRenderingContext2D | null = null

  constructor(opt: Omit<VideoOption, any>) {
    this.timer = null
    this.options = { ...defaultOption, ...opt }
    this.initVideo()
    this.initWebGL()

    if (this.options.autoplay) {
      this.video?.play()
    }
  }

  initVideo() {
    const { src, loop, autoplay, onError, onEnd, onPlay } = this.options
    const video: HTMLVideoElement = document.createElement('video')
    Object.assign(video, {
      autoplay,
      src,
      loop,
      mute: true,
      muted: true,
      volume: 0,
      crossOrigin: 'anonymous',
      playsInline: true
    })
    video.style.display = 'none'

    video.addEventListener('canplay', () => {
      this.playing = true
      if (onPlay) {
        onPlay()
      }
    })

    video.addEventListener('error', () => {
      if (onError) {
        onError()
      }
    })

    video.addEventListener('ended', () => {
      if (onEnd) {
        onEnd()
      }
    })

    video.addEventListener('play', () => {
      this.timer = window.requestAnimationFrame(() => {
        // todo
      })
    })

    document.body.appendChild(video)
    this.video = video
  }

  initWebGL() {
    this.canvas = this.options.canvas
    if (this.canvas) {
      this.canvas.width = this.options.width
      this.canvas.height = this.options.height
      this.graphics = this.canvas.getContext('2d')
    }
  }

  drawFrame() {
    if (this.playing) {
      this.drawWebglFrame()
    }
    this.timer = window.requestAnimationFrame(() => {
      this.drawFrame()
    })
  }

  drawWebglFrame() {
    // 配置纹理图像
    if (!this.video) {
      return
    }
    if (this.graphics) {
      const { width: w, height: h } = this.options
      this.graphics.drawImage(this.video, 0, 0, w, h)
    }
  }

  play() {
    this.playing = true
    this.video?.play()
  }

  pause() {
    this.playing = false
    this.video?.pause()
  }

  change(src: string, loop = true) {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
      this.timer = null
    }
    if (this.video) {
      this.video.onloadeddata = null
      this.pause()
      this.video.src = src
      this.video.loop = loop
      this.video.onloadeddata = () => {
        this.play()
        if (this.video) {
          this.video.onloadeddata = null
        }
      }
    }
  }
}

const AlphaVideo = forwardRef((props, ref) => {
  const videoRef = useRef<{ change: (str: string, loop: boolean) => void }>(null)
  const timerRef = useRef(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = null
  }

  const changeVideo = (opt: InstructionOption = { ins: 'default', lazy: 1000, next: 'default' }) => {
    videoRef.current?.change(MP4_SRC[opt.ins], opt.loop || opt.ins !== 'award')
    if (opt.ins === 'award') {
      clearTimer()
      timerRef.current = setTimeout(() => {
        videoRef.current.change(MP4_SRC.default, true)
      }, 3040)
    }
  }

  useEffect(() => {
    videoRef.current = new WebGLVideo({
      src: MP4_SRC.default,
      width: 750,
      height: 1100,
      canvas: document.getElementById('video-canvas-goddess'),
      autoplay: true,
      ...props.conf
    })
  }, [])

  useImperativeHandle(ref, () => ({
    changeVideo
  }))

  return <canvas id="video-canvas-goddess" ref={videoRef} className="goddess-video-canvas" />
})

AlphaVideo.defaultProps = {
  conf: {}
}

AlphaVideo.propTypes = {
  conf: PT.shape({})
}

export default AlphaVideo
