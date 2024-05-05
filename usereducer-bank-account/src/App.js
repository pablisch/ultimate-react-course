import { useReducer, useState } from 'react';
import './styles.css';

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  depositAmount: 100,
  withdrawalAmount: 50
};

const openingBalance = 500;
// let depositAmount = 0;
// const withdrawalAmount = 500;
const loanAmount = 5000;

const reducer = (state, action) => {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return { ...state, isActive: true, balance: action.payload };
    case 'deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'getLoan':
      return {
        ...state,
        loan: action.payload,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
      };
    case 'payLoan':
      return {
        ...state,
        loan: 0,
        balance:
          state.loan === 0 ? state.balance : state.balance - action.payload,
      };
    case 'closeAccount':
      return state.balance === 0 && state.loan === 0 ? initialState : state;
    case 'depositAmount':
      return { ...state, depositAmount: action.payload };
    case 'withdrawalAmount':
      return { ...state, withdrawalAmount: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};

export default function App() {
  const [{ balance, loan, isActive, depositAmount, withdrawalAmount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [depositAmount, setDepositAmount] = useState(0);
  // const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  return (
    <div className='App'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: 'openAccount', payload: openingBalance });
          }}
          disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <input
          type='text'
          value={depositAmount}
          onChange={(e) => dispatch({type: 'depositAmount', payload: Number(e.target.value)})}
        />
        <button
          onClick={() => {
            dispatch({ type: 'deposit', payload: Number(depositAmount) });
          }}
          disabled={!isActive}>
          Deposit {depositAmount}
        </button>
      </p>
      <p>
        <input
          type='text'
          value={withdrawalAmount}
          onChange={(e) => dispatch({type: 'withdrawalAmount', payload: Number(e.target.value)})}
        />
        <button
          onClick={() => {
            dispatch({ type: 'withdraw', payload: withdrawalAmount });
          }}
          disabled={!isActive}>
          Withdraw {withdrawalAmount}
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'getLoan', payload: loanAmount });
          }}
          disabled={!isActive}>
          Request a loan of {loanAmount}
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'payLoan', payload: loanAmount });
          }}
          disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'closeAccount' });
          }}
          disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
