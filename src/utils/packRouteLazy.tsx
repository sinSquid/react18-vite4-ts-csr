import React, { Suspense, lazy } from 'react'

export default function packRouteLazy(path: string) {
  const LazyComponent = lazy(() => import(path))
  // const LazyComponent = lazy(() => import('../views/Robot'))
  return (
    <Suspense fallback={<span>loading...</span>}>
      <LazyComponent />
    </Suspense>
  )
}
