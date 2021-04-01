import React, { useState } from 'react'
import './App.css'
import { FinalTimer } from './components/FinalTimer'
import { Timer } from './components/Timer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Learn React Hooks</h1>
      </header>
      <main>
        <div>
          <h2>Work In Progress</h2>
          <Timer initialTime="0" />
        </div>
        <div>
          <h2>Final Timer</h2>
          <FinalTimer />
        </div>
      </main>
    </div>
  )
}

export default App
