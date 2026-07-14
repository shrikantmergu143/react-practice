/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

export default function CounterComponent() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('Updating the counter state =', counter);
  }, [counter]);
  const incrementButton = () => {
    setCounter((state) => state + 1);
  };
  const decrementButton = () => {
    setCounter((state) => state - 1);
  };
  return (
    <div className="p-5">
      <div>
        <button className="p-3 border" onClick={incrementButton}>
          +
        </button>{' '}
        <span className="px-4">No. of Time Click the button {counter}</span>
        <button className="p-3 border" onClick={decrementButton}>
          -
        </button>
      </div>
    </div>
  );
}
