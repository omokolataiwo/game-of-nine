import React from 'react';

const NumberBtn = ({ onSelectNumber, selectedAnswers, usedNumbers }) => {
  const selectedClass = number => {
    let classes = '';

    if (selectedAnswers.indexOf(number) > -1) classes += 'selected';
    if (usedNumbers.indexOf(number) > -1) classes += 'used';

    return classes;
  };

  return (
    <div className="control-wrapper">
      {NumberBtn.size.map((_, index) => {
        index++;
        return (
          <span
            onClick={() => onSelectNumber(index)}
            className={`number-btn ${selectedClass(index)}`}
            key={index}
          >
            {index}
          </span>
        );
      })}
    </div>
  );
};

NumberBtn.size = Array(9).fill(0);
export default NumberBtn;
