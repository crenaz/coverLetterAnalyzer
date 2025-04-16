import React, { useRef, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import { Puff } from  'react-loader-spinner';
import {Fragment} from 'react';
import coverLetters from './assets/coverLetterList.json';

function App() {
  const [count, setCount] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState('');

  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const handleLetterChange = (e) => {
    setSelectedLetter(coverLetters[e.target.value]);
  };

  // load TF model
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log('Model loaded');
  }

  useEffect(()=>{loadModel}, []); //Time 11:04

  const answerQuestion = async (e) => {
    if(e.which === 13 && model !==null){
      console.log('Question submitted');
      const passage = passageRef.current.value;
      const question = questionRef.current.value;

      const answers = await model.findAnswers(question, passage)
      setAnswer(answers);
      console.log(answers);
    }
  };

  return (
    <div className="App">
      <h1 className="read-the-docs">Cover Letter Analyzer</h1>
      
      <select onChange={handleLetterChange}>
        <option value="">Choose a letter</option>
        {Object.keys(coverLetters).map((key) => (
          <option key={key} value={key}>
            Letter {key}
          </option>
        ))}
      </select>

      {selectedLetter && (
        <div className="letter-content">
          <div dangerouslySetInnerHTML={{ __html: selectedLetter }} />
        </div>
      )}
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {model == null? 
        <div>
          <div>Model Loading</div>
          <Puff
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
        :
        <Fragment>
          Passage
          <textarea ref={passageRef} rows="38" cols="100"></textarea>
          Ask a Question
          <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
          Answers
          {answer ? answer.map((ans,idx)=><div><b>Answer {idx+1} - </b>{ans.text} {ans.score}</div>): ""}

        </Fragment>
        }
    </div>
  );
}

export default App
