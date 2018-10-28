import React from 'react';

export default ({ onRedraw, redrawCount }) => {
  return (
    <span className="redraw" onClick={() => onRedraw()}>
      <i className="fa fa-refresh">{redrawCount}</i>
    </span>
  );
};
