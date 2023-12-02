import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';
import Test from './test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
    <StarRating maxRating={5} color={'blue'} size={20} messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing!']} defaultRating={3} />
    <Test />
  </React.StrictMode>
);