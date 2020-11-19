import React, { useState } from 'react';
import '../stylesheets/Question.css';
import { useAuth0 } from '@auth0/auth0-react';



const Question = ({ question, options, computeAnswer, optionSelectedId, refresh, selectedAnswer, correctAnswer, nextPage, previousPage }) => {

  const [showPercentage, setShowPercentage] = useState(false)
  const handleChange = () => {
    setShowPercentage(prevState => !prevState)
  }

  const { isAuthenticated } = useAuth0();

  const [state, setState] = useState(false);

  return (

    isAuthenticated && (

      <div className="Question-holder">
        <div className="Question">{question} </div>
        <div className="Question-status">
          {options.map((q, ind) => (
            <ul className="Answer">
              <button
                className={
                  correctAnswer === q.id ?
                    'correct' :
                    selectedAnswer === q.id ?
                      'incorrect' : ""}

                disabled={state}
                
                onClick={() => {
                  computeAnswer(q.id);
                  optionSelectedId(q.id);
                  refresh();
                  setState(true);
                }}> {q.option}
              </button>


              <div className="percentageBox" >
                {showPercentage && <div>{q.percentage}% of the users selected this</div>}
              </div>

            </ul>
          ))}

          <div className="pageButton button" onClick={handleChange}>
            Show stats
         </div>

          <div className="pageButton button" onClick={() => {
            nextPage();
          }}>
            Next Page
         </div>

          <div className="pageButton button" onClick={() => {
            previousPage();
          }}>
            Previos Page
         </div>


        </div>



      </div>
    ))

};






export default Question;
