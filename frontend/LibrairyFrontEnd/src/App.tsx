import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Books from './Component/Book'
import {FetchOpinions} from './Component/FetchOpinion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

    <Books/>
    <FetchOpinions/>
    </div>
  )
}

export default App
