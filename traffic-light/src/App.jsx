import { useState } from 'react'
import { Traffic } from './pages/Traffic'
import { Timer } from './pages/Timer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Traffic/>
    </>
  )
}

export default App
