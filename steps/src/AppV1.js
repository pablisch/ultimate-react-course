import { useState } from 'react';

const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Master React 🥷'];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNext = () => {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <button className='close' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'x' : 'o'}
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step > 1 ? 'completed' : 'active'}>1</div>
            <div
              className={step < 2 ? '' : step === 2 ? 'active' : 'completed'}>
              2
            </div>
            <div className={step < 3 ? '' : 'active'}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className='buttons'>
            <Button
              textColor={'#fff'}
              bgColor={'#7950f2'}
              onClick={handlePrevious}>
              <span>👈🏻</span> Previous
            </Button>
            <Button textColor={'#fff'} bgColor={'#7950f2'} onClick={handleNext}>
              Next <span>👉🏻</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({step, children}) {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
