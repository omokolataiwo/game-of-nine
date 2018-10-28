import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Stars from './Stars';
import PlayerAnswer from './PlayerAnswer';
import AnswerBtn from './AnswerBtn';
import NumberBtn from './NumberBtn';
import RedrawBtn from './RedrawBtn';
import DoneStatus from './DoneStatus';

import possibleCombinationSum from './possibleCombinationSum';

import { IS_CORRECT_ANSWER, IS_WRONG_ANSWER } from './gameStateConst';

class App extends Component {
  static generateRandomStar = () => Math.floor(Math.random() * 9) + 1;
  static initialState = () => ({
    answers: [],
    numberOfStars: App.generateRandomStar(),
    isCorrectAnswer: null,
    usedNumbers: [],
    redrawCount: 5,
    doneStatus: '',
  });

  playAgain = () => this.setState(App.initialState());
  state = App.initialState();

  updateAnswer = number => {
    if (this.state.usedNumbers.indexOf(number) > -1) return;

    this.setState(prevState => ({ isCorrectAnswer: null }));
    const numberIndex = this.state.answers.indexOf(number);
    if (numberIndex != -1) {
      this.setState(prevState => {
        prevState.answers.splice(numberIndex, 1);
        return { answers: prevState.answers };
      });
    } else {
      this.setState(prevState => ({
        answers: prevState.answers.concat(number),
      }));
    }
  };

  checkAnswer = () => {
    if (this.state.answers.length === 0) {
      return;
    }

    const isCorrectAnswer =
      this.state.numberOfStars ===
      this.state.answers.reduce((sum, num) => sum + num, 0)
        ? IS_CORRECT_ANSWER
        : IS_WRONG_ANSWER;
    this.setState(prevState => ({
      isCorrectAnswer,
    }));
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(this.state.answers),
        answers: [],
        isCorrectAnswer: null,
        numberOfStars: App.generateRandomStar(),
      }),
      this.updateDoneStatus,
    );
  };

  onRedraw = () => {
    if (this.state.redrawCount === 0) {
      return;
    }
    this.setState(
      prevState => ({
        redrawCount: prevState.redrawCount - 1,
        numberOfStars: App.generateRandomStar(),
      }),
      this.updateDoneStatus,
    );
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done! Welldone.' };
      }
      if (prevState.redrawCount === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  };

  possibleSolutions = ({ numberOfStars, usedNumbers }) => {
    const possibleNumbers = this.getPossibleNumbers(usedNumbers);
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };

  getPossibleNumbers = usedNumbers => {
    let index = 0;
    const LIMIT = 10;
    const possibleNumbers = [];

    while (++index < LIMIT) {
      if (usedNumbers.indexOf(index) === -1) {
        possibleNumbers.push(index);
      }
    }
    return possibleNumbers;
  };

  resetGame = () => {};

  render() {
    return (
      <div className="main">
        <h3 className="title">Game of 9!</h3>
        <div>
          <div className="player-pad">
            {this.state.doneStatus ? (
              <DoneStatus
                playAgain={this.playAgain}
                status={this.state.doneStatus}
              />
            ) : (
              <NumberBtn
                onSelectNumber={this.updateAnswer}
                selectedAnswers={this.state.answers}
                usedNumbers={this.state.usedNumbers}
              />
            )}
          </div>
          <div className="game-environment">
            <PlayerAnswer answers={this.state.answers} />
            <Stars numberOfStars={this.state.numberOfStars} />
            <AnswerBtn
              isCorrectAnswer={this.state.isCorrectAnswer}
              checkAnswer={this.checkAnswer}
              acceptAnswer={this.acceptAnswer}
            />
            <RedrawBtn
              onRedraw={this.onRedraw}
              redrawCount={this.state.redrawCount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
