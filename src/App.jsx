import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
 

function App() {
  const [count, setCount] = useState(1)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <h1 className="read-the-docs">now with VITE + REACT</h1>
        <p>Select a cover letter from the list.</p>
        <p id="mn"></p>
        <p id="cvrlttr"></p>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
