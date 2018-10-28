import React from 'react';

const Star = ({ numberOfStars }) => {
  return (
    <div className="stars">
      {Array(numberOfStars)
        .fill(0)
        .map((_, index) => (
          <i className="fa fa-star" key={index} />
        ))}
    </div>
  );
};

export default Star;
