import { useState } from 'react';
import './App.css';
import BillAmount from './BillAmount';
import BillCalc from './BillCalc';
import Satisfaction from './Satisfaction';
import Reset from './Reset';

function App() {
  const [bill, setBill] = useState(0);
  const [yourTip, setYourTip] = useState(0.1);
  const [friendTip, setFriendTip] = useState(0.1);
  
  return (
    <div className="App">
      <BillAmount bill={bill} setBill={setBill} />
      <Satisfaction tip={yourTip} setTip={setYourTip} >How much did you like the service? </Satisfaction>
      <Satisfaction tip={friendTip} setTip={setFriendTip} >How much did your friend like the service? </Satisfaction>
      <BillCalc bill={bill} yourTip={yourTip} friendTip={friendTip} />
      <Reset setBill={setBill} setYourTip={setYourTip} setFriendTip={setFriendTip} />
    </div>
  );
}

export default App;
