// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from 'react';

export default function App() {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [destinationCurrency, setDestinationCurrency] = useState('INR');
  const [amount, setAmount] = useState('1');
  const [converted, setConverted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (baseCurrency === destinationCurrency) {
      return setConverted(amount);
    }
    const fetchConversion = async () => {
      setIsLoading(true);

      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${destinationCurrency}`);
      const data = await response.json();
      setConverted(data.rates[destinationCurrency])
      console.log(baseCurrency, destinationCurrency, converted)
      setIsLoading(false);
    }

    fetchConversion();
  }, [baseCurrency, destinationCurrency, amount, converted])

  return (
    <div>
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={destinationCurrency} onChange={(e) => setDestinationCurrency(e.target.value)} disabled={isLoading} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? 'converting...' : converted}</p>
    </div>
  );
}

