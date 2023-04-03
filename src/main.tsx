import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import createStore from '@store/index'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={createStore({})}>
      <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
