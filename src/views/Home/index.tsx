import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '#@assets/react.svg'
import Footer from './Footer'
import HomeStyle from './index.module.scss'

const publicPath = import.meta.env.VITE_PUBLIC_PATH
function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const goAboutPage = () => {
    navigate('/about')
  }

  return (
    <div className={HomeStyle.home}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={`${publicPath}vite.svg`} className={HomeStyle.logo} alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={`${HomeStyle.logo} ${HomeStyle.react}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={HomeStyle.card}>
        <button
          onClick={() => {
            setCount((count) => count + 1)
          }}
        >
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <button onClick={goAboutPage}>点击跳转到about页面</button>
      <Footer />
    </div>
  )
}

export default Home
