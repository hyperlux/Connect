import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Import Tailwind styles
import './index.css'
import './critical.css'

// Force style refresh
if (import.meta.hot) {
  import.meta.hot.accept('./index.css', () => {
    const oldLink = document.querySelector('link[href*="index"]');
    if (oldLink) {
      oldLink.remove();
    }
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = '/assets/index.css?' + Date.now();
    document.head.appendChild(newLink);
  });
}

const root = document.getElementById('root')!;
root.innerHTML = ''; // Clear any existing content
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
