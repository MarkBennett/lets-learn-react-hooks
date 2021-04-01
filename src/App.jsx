import React, { useState } from 'react'
import './App.css'
import { Timer } from './components/Timer'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's Learn React Hooks</h1>
      </header>
      <main>
        <Timer />
      </main>
    </div>
  )
}

export default App
