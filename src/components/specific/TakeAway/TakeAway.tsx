import React from 'react';
import TakeAwayLeft from './TakeAwayLeft';
import Cart from './Cart';

const TakeAway: React.FC = () => {
  return (
      <div className="flex h-screen">
        <div className="w-1/2 p-4">
        <h1>Take-away</h1>
          <TakeAwayLeft />
        </div>
        <div className="w-1/2 p-4">
          <Cart />
        </div>
      </div>
  );
};

export default TakeAway;
