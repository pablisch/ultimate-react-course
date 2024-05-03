import React, { useEffect } from 'react';

const Timer = ({ dispatch, secondsRemaining }) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, secondsRemaining]);

  return (
    <div className='timer'>
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
};

export default Timer;
