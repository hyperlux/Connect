import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ServiceWorkerInitializer from './serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServiceWorkerInitializer />
    <App />
  </React.StrictMode>
)