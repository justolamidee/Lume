import React from "react"
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={5000} newestOnTop />
  </React.StrictMode>,
)
