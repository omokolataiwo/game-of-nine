import React from 'react';

export default ({ answers }) => {
  return (
    <div className="player-answer">
    {answers.join(" + ")}
    </div>
  );
}