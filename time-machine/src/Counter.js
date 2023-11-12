import { useState, useEffect } from 'react';

function Counter() {
  // let timeIntro;
  const [amplitude, setAmplitude] = useState(1);
  const [timeTravel, setTimeTravel] = useState(0);
  const [timeIntro, setTimeIntro] = useState('Today is ');

  const oneDay = 86400000;
  const now = new Date().getTime(); // => e.g. 1699567737723

  const handleTimeSubtract = () => {
    setTimeTravel((travel) => travel - amplitude);
  };

  const handleTimeAdd = () => {
    setTimeTravel((travel) => travel + amplitude);
  };

  const handleNumberInput = (e) => {
    setTimeTravel(Number(e.target.value));
  };

  useEffect(() => {
    console.log('In UE, timeT:', timeTravel, typeof timeTravel);
    const timeIntroPhrase =
      timeTravel === 0
        ? 'Today is '
        : timeTravel === 1
        ? ' day from today is '
        : timeTravel === -1
        ? ' day ago was '
        : timeTravel > 1
        ? ' days from today is '
        : ' days ago was ';
    setTimeIntro(timeIntroPhrase);
  }, [timeTravel]);

  return (
    <div>
      <div className='inline'>
        
        <input type="range" value={amplitude} min="1" max="10" onChange={(e)=> setAmplitude(Number(e.target.value))} />
        <span>{ amplitude}</span>
      </div>
      <div className='inline'>
        <button onClick={handleTimeSubtract}>-</button>
        <input type='number' value={timeTravel} onChange={handleNumberInput} />
        <button onClick={handleTimeAdd}>+</button>
      </div>
      <p className='phrase'>
        {timeTravel !== 0 ? Math.abs(timeTravel) : ''}
        {timeIntro}
        {new Date(now + oneDay * timeTravel).toDateString()}
      </p>
    </div>
  );
}

export default Counter;
