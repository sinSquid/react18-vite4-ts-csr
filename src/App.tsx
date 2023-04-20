import React, { useEffect } from 'react'
import MyRoutes from '@/router'
import { useVConsole } from '@hooks/useVconsole'
import { useEventBus } from '@hooks/useEventBus'
// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  const vConsole = useVConsole()
  const eventBus = useEventBus()

  eventBus.on('addAge', () => {
    // todo
  })
  useEffect(() => {
    return () => {
      vConsole?.destroy()
    }
  }, [])

  return (
    <div>
      <MyRoutes />
    </div>
  )
}
