import React, { useState } from 'react'
import './App.css'
import { FinalTimer } from './components/FinalTimer'
import { Timer } from './components/Timer';

function App() {
  console.log("RENDERING APP")

  // Use the useState() setter to trigger a re-render on demand
  const [_, triggerRender] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Learn React Hooks</h1>
      </header>
      <main>
        <button onClick={triggerRender}>Render Again</button>
        <div>
          <h2>Work In Progress</h2>
          <Timer/>
        </div>
        <div>
          <h2>Final Timer</h2>
          <FinalTimer initialTime="0" />
        </div>
      </main>
    </div>
  )
}

export default App
