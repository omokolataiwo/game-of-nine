import React from 'react';
import { IS_CORRECT_ANSWER, IS_WRONG_ANSWER } from './gameStateConst';
export default ({ checkAnswer, isCorrectAnswer, acceptAnswer }) => {
  const renderButton = () => {
    switch (isCorrectAnswer) {
      case IS_WRONG_ANSWER:
        return <button onClick={() => checkAnswer()}>Wrong</button>;
      case IS_CORRECT_ANSWER:
        return <button onClick={() => acceptAnswer()}>Accept</button>;
      default:
        return <button onClick={() => checkAnswer()}>Check</button>;
    }
  };
  return <span className="check-answer">{renderButton()}</span>;
};
