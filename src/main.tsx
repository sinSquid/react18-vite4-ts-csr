import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import createStore from '#@store/index'
import './index.css'

function renderApp() {
  const store = createStore({})
  if (import.meta.env.NODE_ENV === 'production') {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
            <App />
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    )
  }
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(renderApp())
