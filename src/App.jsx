import React, { useRef, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import {Fragment} from 'react';

function App() {
  const [count, setCount] = useState(1);

  const passageref = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  // load TF model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log('Model loaded');
  }

  useEffect(()=>{loadModel}, []) //Time 11:04

  return (
    <div className="App">
      <div>
      <h1 className="read-the-docs">Cover Letter Analyzer</h1>
      <h2>now with VITE + REACT</h2>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
