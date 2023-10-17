import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './Component/App/App'
import './Component/OpinionEdit/OpinionEdit.css'
import './Component/Book/Book.css'
import './Component/Opinion/Opinion.css'
import './Component/BookCreate/BookCreate.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
