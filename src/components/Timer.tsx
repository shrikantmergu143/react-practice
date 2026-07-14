/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

export default function Timer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((state) => state + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>{timer}</div>;
}
