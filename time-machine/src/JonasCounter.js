import { useState } from 'react';

function Counter() {
  const [amplitude, setAmplitude] = useState(1);
  const [timeTravel, setTimeTravel] = useState(0);

  const oneDay = 86400000;
  const now = new Date().getTime(); // => e.g. 1699567737723

  const handleAmpSubtract = () => {
    if (amplitude > 1) setAmplitude((amp) => amp - 1);
  };

  const handleAmpAdd = () => {
    setAmplitude((amp) => amp + 1);
  };

  const handleTimeSubtract = () => {
    setTimeTravel((travel) => travel - amplitude);
  };

  const handleTimeAdd = () => {
    setTimeTravel((travel) => travel + amplitude);
  };

  const timeIntro =
    timeTravel === 0
      ? 'Today is '
      : timeTravel === 1
      ? ' day from today is '
      : timeTravel === -1
      ? ' day ago was '
      : timeTravel > 1
      ? ' days from today is '
      : ' days ago was ';

  return (
    <div>
      <div className='inline'>
        <button onClick={handleAmpSubtract}>-</button>
        <p>Amplitude: {amplitude}</p>
        <button onClick={handleAmpAdd}>+</button>
      </div>
      <div className='inline'>
        <button onClick={handleTimeSubtract}>-</button>
        <p>time travel: {timeTravel}</p>
        <button onClick={handleTimeAdd}>+</button>
      </div>
      <p className='phrase'>
        {timeTravel ? Math.abs(timeTravel) : ''}
        {timeIntro}
        {new Date(now + oneDay * timeTravel).toDateString()}
      </p>
    </div>
  );
}

export default Counter;

const date2 = new Date(1696352525235); // => Tue Oct 03 2023 18:02:05 GMT+0100 (British Summer Time)
const date3 = new Date('3 oct 2023'); // => Tue Oct 03 2023 00:00:00 GMT+0100 (British Summer Time)
const date4 = new Date('10/3/23'); // => Tue Oct 03 2023 00:00:00 GMT+0100 (British Summer Time)
const date5 = new Date(2023, 9, 3, 12); // => Tue Oct 03 2023 12:00:00 GMT+0100 (British Summer Time)

// const dateNow = new Date();
// console.log(dateNow)
// dateNow.setDate(dateNow.getDate() + 1);
// console.log(dateNow)
// dateNow.setDate(dateNow + 1);
// console.log(dateNow)

const janDate = new Date(2023, 0, 15, 12) // 15th Jan
const dateValue = janDate.getDate(); // dateValue is 15
// console.log(dateValue)
janDate.setDate(20); // janDate is now 20th Jan
janDate.setDate(40); // janDate is now 9th Feb

const dateNow = new Date() // 10th Nov
dateNow.setDate(dateNow.getDate() + 1); // 11th Nov
console.log(dateNow);