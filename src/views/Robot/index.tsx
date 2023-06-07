import React, { useRef, useEffect } from 'react'
import type { MutableRefObject } from 'react'
import {
  PerspectiveCamera,
  Scene,
  Color,
  Fog,
  Clock,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  PlaneGeometry,
  MeshPhongMaterial,
  GridHelper,
  WebGLRenderer,
  AnimationMixer,
  LoopOnce
} from 'three'
import type {
  AnimationClip as AnimationClipType,
  AnimationAction as AnimationActionType,
  Group as GroupType,
  WebGLRenderer as WebGLRendererType,
  PerspectiveCamera as PerspectiveCameraType,
  Clock as ClockType,
  AnimationMixer as AnimationMixerType,
  Scene as SceneType,
  Mesh as MeshType
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Stats as StatsType } from '#@types/three'
import { states, emotes } from '#@views/Robot/const'
import style from './index.module.scss'

function Robot() {
  const contentRef: MutableRefObject<{
    actions: { [key: string]: AnimationActionType | null }
    activeAction?: AnimationActionType | null
    previousAction?: AnimationActionType | null
    mixer?: AnimationMixerType | null
    clock?: ClockType | null
    stats: StatsType | null
  }> = useRef({
    stats: null,
    clock: null,
    mixer: null,
    actions: {},
    activeAction: null,
    previousAction: null
  })
  const mainRef: MutableRefObject<{
    camera: PerspectiveCameraType | null
    scene: SceneType | null
    renderer: WebGLRendererType | null
    model: GroupType | null
    face: MeshType | null
  }> = useRef({
    camera: null,
    scene: null,
    renderer: null,
    model: null,
    face: null
  })
  const apiRef: React.MutableRefObject<{ state: string; [key: string]: string | (() => void) }> = useRef({
    state: 'Walking'
  })
  const containerRef = useRef<HTMLDivElement>(null)

  function onWindowResize() {
    if (mainRef.current.camera) {
      mainRef.current.camera.aspect = window.innerWidth / window.innerHeight
    }
    mainRef.current.camera?.updateProjectionMatrix()
    mainRef.current.renderer?.setSize(window.innerWidth, window.innerHeight)
  }

  function fadeToAction(name: string, duration: number) {
    contentRef.current.previousAction = contentRef.current.activeAction
    contentRef.current.activeAction = contentRef.current.actions[name]
    if (contentRef.current.previousAction !== contentRef.current.activeAction) {
      contentRef.current.previousAction?.fadeOut(duration)
    }
    contentRef.current.activeAction?.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
  }

  function createGUI(model: GroupType, animations: AnimationClipType[]): void {
    const gui = new GUI({ title: 'NieR:Automata', width: 180 })
    const mixer = new AnimationMixer(model)
    contentRef.current.actions = {}
    for (const at of animations) {
      const action: AnimationActionType = mixer.clipAction(at)
      contentRef.current.actions[at.name] = action
      if (emotes.includes(at.name) || states.lastIndexOf(at.name) >= 4) {
        action.clampWhenFinished = true
        action.loop = LoopOnce
      }
    }
    // states
    const statesFolder = gui.addFolder('States')
    const clipCtrl = statesFolder.add(apiRef.current, 'state').options(states)
    clipCtrl.onChange(() => {
      fadeToAction(apiRef.current.state, 0.5)
    })
    statesFolder.open()
    // emotes
    const emotesFolder = gui.addFolder('Emotes')
    function restoreState() {
      mixer.removeEventListener('finished', restoreState)
      fadeToAction(apiRef.current.state, 0.2)
    }
    for (const et of emotes) {
      apiRef.current[et] = () => {
        fadeToAction(et, 0.2)
        mixer.addEventListener('finished', restoreState)
      }
      emotesFolder.add(apiRef.current, et)
    }
    contentRef.current.mixer = mixer
    emotesFolder.close()

    // expressions
    const face = model.getObjectByName('Head_4') as MeshType
    mainRef.current.face = face
    const { morphTargetDictionary = {}, morphTargetInfluences = [] } = face
    const expressions = Object.keys(morphTargetDictionary)
    const expressionFolder = gui.addFolder('Expressions')
    expressions.forEach((val, idx) => {
      expressionFolder.add(morphTargetInfluences, `${idx}`, 0, 1, 0.01).name(val)
    })
    const activeAction = contentRef.current.actions.Walking
    contentRef.current.activeAction = activeAction
    activeAction?.play()
    expressionFolder.close()
    gui.close()
  }

  function init() {
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100)
    camera.position.set(-5, 3, 10)
    camera.lookAt(0, 2, 0)

    const scene = new Scene()
    scene.background = new Color(0xe0e0e0)
    scene.fog = new Fog(0xe0e0e0, 20, 100)

    contentRef.current.clock = new Clock()

    // lights
    const hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    const dirLight = new DirectionalLight(0xffffff)
    dirLight.position.set(0, 20, 10)
    scene.add(dirLight)

    // ground
    const mesh = new Mesh(new PlaneGeometry(2000, 2000), new MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }))
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)

    const grid = new GridHelper(40, 40, 0x000000, 0x000000)
    grid.material.setValues({
      opacity: 0.1,
      transparent: true
    })
    scene.add(grid)

    // model
    const loader = new GLTFLoader()
    loader.load(
      '/src/assets/three/RobotExpressive.glb',
      (gltf) => {
        mainRef.current.model = gltf.scene
        scene.add(gltf.scene)
        createGUI(gltf.scene, gltf.animations)
      },
      undefined
    )

    // renderer
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
      window.addEventListener('resize', onWindowResize)
    }

    // stats
    const stats: StatsType = new Stats()
    containerRef.current?.appendChild(stats.dom)

    contentRef.current.stats = stats
    mainRef.current = {
      ...mainRef.current,
      renderer,
      camera,
      scene
    }
  }

  function animate() {
    const delta = contentRef.current.clock?.getDelta()
    if (contentRef.current.mixer && delta) {
      contentRef.current.mixer.update(delta)
    }
    requestAnimationFrame(animate)
    const { renderer, scene, camera } = mainRef.current
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
    contentRef.current.stats?.update()
  }

  useEffect(() => {
    init()
    animate()
  }, [])

  return <div id="robot" className={style['robot-layout']} ref={containerRef} />
}

export default Robot
