import React from 'react';
import '../stylesheets/ResultView.css';
import FacebookButton from './FacebookButton';

const Result = ({ score, restartQuiz, timeTaken }) => {

  var levelOne = "Score 0-2: Clueless. Don’t be discouraged! Learn some more about this topic, and come back to try again!"
  var levelTwo = "Score 3-5: Beginner. This is the level most players end up with after answering this quiz for the first time.\
                          Learn some more about this topic and come back to try again!"
  var levelThree = "Score 5-8: Confident: This is the level players are getting pro! Continue your progress and rock it!"
  var levelFour = "Score 8-10: Expert: This is the highest level achievable! Thanks for being awesome as you are!"

  var mintues = "Minutes"
  var seconds = "Seconds"
  var quizTimeTaken = (timeTaken >= 60) ? (timeTaken / 60).toFixed(2) +
    " " + mintues : timeTaken.toFixed(2) + " " + seconds

  var playerLevel = (score <= 2) ? levelOne : (score <= 5 && score >= 3) ? levelTwo :
    (score <= 8 && score >= 5) ? levelThree :
      (score <= 10 && score >= 8) ? levelFour : null

  return (

    <div className="score-board">
      <div className="score">

        <div>Your score is {score} / 10 correct answer !</div>
        <br></br>
        <div>{ //Check if message failed
          playerLevel
        }

        </div>
        <br></br>

        <div>
          Time Taken: {quizTimeTaken}

        </div>
        <br></br>
        <div>
          <button className="restartButton" onClick={restartQuiz} > Restart </button></div>
      </div>

      <FacebookButton
        timeTaken={quizTimeTaken}
        playerLevel={playerLevel}
      ></FacebookButton>




    </div>

  )
}


export default Result;