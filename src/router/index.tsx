import React, { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '#@/views/Home'

const modules: { [key: string]: React.LazyExoticComponent<() => JSX.Element> } = {
  '/about': lazy(() => import('#@/views/About')),
  '/lottie': lazy(() => import('#@/views/Lottie')),
  '/robot': lazy(() => import('#@/views/Robot')),
  '/fox': lazy(() => import('#@/views/Fox')),
  '/shell': lazy(() => import('#@/views/Shell'))
}

const paths = [
  {
    key: '/about'
  },
  {
    key: '/lottie'
  },
  {
    key: '/robot'
  },
  {
    key: '/fox'
  },
  {
    key: '/shell'
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
