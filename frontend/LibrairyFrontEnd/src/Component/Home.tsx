import React from 'react'
import { BrowserRouter,Routes,Route,Link, useNavigate } from 'react-router-dom'
import Books from './Books'
import AddBook from './AddBook'

function Home() {
  
  return (
    <div>
      <Books/>
    </div>
  )
}

export default Home
