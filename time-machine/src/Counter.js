import { useState } from 'react';

function Counter() {
  const [amplitude, setAmplitude] = useState(1);
  const [timeTravel, setTimeTravel] = useState(0);
  
  const oneDay = 86400000;
  const now = new Date().getTime(); // => e.g. 1699567737723

  const handleAmpSubtract = () => {
    if (amplitude > 1) setAmplitude(amp => amp - 1);
  }

  const handleAmpAdd = () => {
    setAmplitude(amp => amp + 1);
  }

  const handleTimeSubtract = () => {
    setTimeTravel(travel => travel - amplitude);
  }

  const handleTimeAdd = () => {
    setTimeTravel(travel => travel + amplitude);
  }

  const timeIntro = timeTravel === 0 ? "Today is " :
    timeTravel === 1 ? " day from today is " :
      timeTravel === -1 ? " day ago was " :
        timeTravel > 1 ? " days from today is " : " days ago was ";
    

  return (
    <div>
      <div className='inline'>
        <button onClick={handleAmpSubtract}>-</button>
        <p>Amplitude: { amplitude }</p>
        <button onClick={handleAmpAdd}>+</button>
      </div>
      <div className='inline'>
        <button onClick={handleTimeSubtract}>-</button>
        <p>time travel: { timeTravel }</p>
        <button onClick={handleTimeAdd}>+</button>
      </div>
      <p className='phrase'>{ timeTravel ? Math.abs(timeTravel) : '' }{ timeIntro }{ new Date(now + (oneDay * timeTravel)).toDateString() }</p>
    </div>
  );
}

export default Counter
