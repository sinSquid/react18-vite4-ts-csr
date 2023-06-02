import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '#@/views/Home'
import About from '#@/views/About'
import Goddess from '#@/views/Goddess'
import packRouteLazy from '#@/utils/packRouteLazy'

const RobotLazy = lazy(() => import('#@/views/Robot'))

function func1(path: string) {
  return lazy(() => import(`#@/views/${path}`))
}
const ToT1 = func1('Robot')
function func2() {
  return lazy(() => import('#@/views/Robot'))
}
const ToT2 = func2()

export default function Router() {
  const Robot = packRouteLazy('#@/views/Robot')
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/goddess',
      element: <Goddess />
    },
    {
      path: '/robot',
      element: (
        <Suspense fallback={<span>lalala</span>}>
          <ToT1 />
        </Suspense>
      )
    }
  ])
}
