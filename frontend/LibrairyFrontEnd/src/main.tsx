import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import './Component/Opinion/OpinionEdit.css'
import './Component/Book/Book.css'
import './Component/Opinion/FetchOpinion.css'
import './Component/Book/AddBook.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
