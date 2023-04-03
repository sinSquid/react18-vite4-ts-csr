import React from 'react'
import { useSelector } from 'react-redux'
import { changeUser } from '@reducers/user'

function About() {
  const [pageTitle] = useState('laoer536-关于页面') //因为加入了unplugin-auto-import 所以不用在手动导入
  const { name, age } = useSelector((state: any) => state.user)

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{`${name}:${age}`}</p>
      <button
        onClick={() => {
          changeUser({ age: age + 1 })
        }}
      >
        点击改变数字
      </button>
    </div>
  )
}

export default About
