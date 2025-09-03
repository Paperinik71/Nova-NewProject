import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('log')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// wire simple input
import { sendFromOutside } from './send'
const box = document.getElementById('box')
const btn = document.getElementById('send')
btn.onclick = () => { sendFromOutside(box.value); box.value=''; }
box.addEventListener('keydown', (e)=>{ if(e.key==='Enter'){ btn.click() } })
