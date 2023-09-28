import React from 'react'
import { BrowserRouter,Routes,Route,Link, useNavigate } from 'react-router-dom'
import {Books} from './Book/Books'
import {AddBook} from './Book/AddBook'

export const Home = () => {
  
  return (
    <div>
      <Books/>
    </div>
  )
}


