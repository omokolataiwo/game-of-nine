import React from 'react';

export default ({ status, playAgain }) => {
  return (
    <div className="done-frame">
      <div>{status}</div>
      <span onClick={() => playAgain()}>Play Again</span>
    </div>
  );
};
