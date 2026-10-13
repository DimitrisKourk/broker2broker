import React, { useState } from 'react'
import './B2BMain.css'
import UserLogin from '../UserLogin/UserLogin'

function B2BMain() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main className="main">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <UserLogin redirectionURL='/pricing'/> 
    </main>
    </>
    
  )
}

export default B2BMain
