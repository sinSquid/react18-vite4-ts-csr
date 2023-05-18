import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '#@/views/Home'
import About from '#@/views/About'
import Goddess from '#@/views/Goddess'

export default function Router() {
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
    }
  ])
}
