import { useState } from 'react'
import './App.css'
import Task1 from './pages/Task1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Task1 />
    </>
  )
}

export default App
