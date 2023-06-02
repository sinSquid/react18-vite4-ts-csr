import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '#@/views/Home'

const modules: { [key: string]: React.LazyExoticComponent<() => JSX.Element> } = {
  '/about': lazy(() => import('#@/views/About')),
  '/goddess': lazy(() => import('#@/views/Goddess')),
  '/robot': lazy(() => import('#@/views/Robot'))
}

const paths = [
  {
    key: '/about'
  },
  {
    key: '/goddess'
  },
  {
    key: '/robot'
  }
]

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    ...paths.map((e) => {
      const Com = modules[e.key]
      return {
        path: e.key,
        element: (
          <Suspense fallback={<span>loading...</span>}>
            <Com />
          </Suspense>
        )
      }
    })
  ])
}
