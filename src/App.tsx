import React from 'react'
import MyRoutes from '@/router'
import { useVConsole } from '@hooks/useVconsole'
// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  useVConsole()
  return (
    <div>
      <MyRoutes />
    </div>
  )
}
