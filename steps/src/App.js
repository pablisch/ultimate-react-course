import { useState } from 'react';

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Master React 🥷'];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNextClick = () => {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousClick = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <button className='close' onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'x' : 'o'}</button>
      { isOpen &&
        <div className='steps'>
          <div className='numbers'>
            <div className={step > 1 ? 'completed' : 'active'}>1</div>
            <div
              className={step < 2 ? '' : step === 2 ? 'active' : 'completed'}>
              2
            </div>
            <div className={step < 3 ? '' : 'active'}>3</div>
          </div>

          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>

          <div className='buttons'>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handlePreviousClick}>
              Previous
            </button>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      }
    </>
  );
}

export default App;
