import React, { Component } from 'react';
import '../stylesheets/App.css';
import Question from './Question';
import Result from './ResultBox';
import Profile from './Profile';
import $ from 'jquery';




class QuestionView extends Component {

  constructor() {
    super();
    let currDate = new Date();
    this.state = {
      questions: [],
      score: 0,
      responses: 0,
      startTime: currDate,
      selectedAnswer: 0,
      correctAnswer: 0,
      page: 1
    }
  
  }

  componentDidMount() {
    this.getQuestions();
  }
  
  getQuestions = () => {
    $.ajax({
      url: `/questions?page=${this.state.page}`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        this.setState({
          questions: result.questions
        })
        return;
      },
      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })
  }

  // Set state back to default and call function 
  restartQuiz = () => {
    let currDate = new Date();
    this.setState({ score: 0, responses: 0, startTime: currDate, page: 1 }, () => this.getQuestions());
  };

  nextPage() {
    if (this.state.page < 10) {
      this.setState({
        page: this.state.page + 1
      }, () => this.getQuestions());
    }
  }

  previousPage() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1
      }, () => this.getQuestions());
    }
  }





  sendSelectedButtonId = (id) => {

    $.ajax({
      url: `/questions/${id}`,
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',

      error: (error) => {
        alert('Unable to load questions. Please try your request again')
        return;
      }
    })

  }


  // Function to compute scores 
  computeAnswer = (answer, correctAns) => {
    if (answer === correctAns) {
      this.setState({
        score: this.state.score + 1,
        correctAnswer: correctAns,
        selectedAnswer: answer


      });
    } else {
      this.setState({
        correctAnswer: 0,
        selectedAnswer: answer
      })
    }
    this.setState({
      responses: this.state.responses < 10
        ? this.state.responses + 1
        : 10
    });
  };


  userAction = (user) => {
    if (user != null) {
      $.ajax({
        url: `/users/`, 
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user, null, 2),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,

        error: (error) => {
          alert('Unable to load questions. Please try your request again')
          return;
        }
      })

    }


  }



  calculateTimeTaken() {
    var endTime = new Date();
    var timeDiff = endTime - this.state.startTime;
    return timeDiff / 1000
  }



  render() {

    return (

      <div className="question-view">
        <div className="score-container">
          <div className="scoreText"> Your Score</div>
          <div className="scoreBox">{this.state.score}</div>


        </div>
        <div className="questions-list">
          <h2>Questions</h2>
          {this.state.questions.length > 0 &&
            this.state.responses < 10 &&
            this.state.questions.map((q, ind) => (
              <Question
                key={q.id}
                question={q.question}
                options={q.options}
                correctAnswer={this.state.correctAnswer}
                computeAnswer={selectedId => this.computeAnswer(selectedId, q.answer)}
                optionSelectedId={id => this.sendSelectedButtonId(id)}
                refresh={() => this.getQuestions()}
                selectedAnswer={this.state.selectedAnswer}
                nextPage={() => this.nextPage()}
                previousPage={() => this.previousPage()}


              />
            ))}

          {
            this.state.responses === 10
              ? (<Result score={this.state.score}
                restartQuiz={this.restartQuiz}
                timeTaken={this.calculateTimeTaken()} />)
              : null
          }

          <Profile
            userProfile={user => this.userAction(user)} />

        </div>

      </div>
    );
  }
}

export default QuestionView;
