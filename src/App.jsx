import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';
import { Puff } from 'react-loader-spinner';
import coverLetters from './assets/coverLetterList.json';
import './App.css';

function App() {
  const [selectedLetter, setSelectedLetter] = useState('');
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

  useEffect(() => { loadModel() }, []);

  const answerQuestion = async (e) => {
    if (e.which === 13 && model !== null) {
      const passage = passageRef.current.value;
      const question = questionRef.current.value;
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
    }
  };


  return (
    <div className="App">
      <h1 className="read-the-docs">Cover Letter Analyzer</h1>
      
      <select onChange={handleLetterChange}>
        <option value="">Choose a letter</option>
        {Object.keys(coverLetters).map((key) => (
          <option key={key} value={key}>Letter {key}</option>
        ))}
      </select>

      {selectedLetter && (
        <div className="letter-content">
          <div dangerouslySetInnerHTML={{ __html: selectedLetter }} />
        </div>
      )}
      
      {model == null ? (
        <div>
          <div>Model Loading</div>
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <>
          <div>Passage</div>
          <textarea ref={passageRef} rows="38" cols="100" />
          <div>Ask a Question</div>
          <input ref={questionRef} onKeyPress={answerQuestion} size="80" />
          <div>Answers</div>
          {answer && answer.map((ans, idx) => (
            <div key={idx}>
              <b>Answer {idx + 1} - </b>{ans.text} {ans.score}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
