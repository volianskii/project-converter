import { ChangeEvent, useEffect, useState } from 'react';
import '../style/style.scss';
import Input from './input/input';

const BASE_URL = 'https://open.er-api.com/v6/latest/';

function App(): JSX.Element {
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [ToCurrency, setToCurrency] = useState<string>('');
  const [FromCurrency, setFromCurrency] = useState<string>('USD');
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(0);

  const inputFromEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
    setAmountInFromCurrency(true)
  }
  const inputToEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
    setAmountInFromCurrency(false)
  }
  console.log(currencyList);
  console.log(exchangeRate);
  let fromAmount;
  let toAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    console.log(`fromAmount: ${fromAmount}`);
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount;
    fromAmount = toAmount / exchangeRate
  }

  useEffect(() => {
    fetch(`${BASE_URL}USD`)
      .then(res => res.json())
      .then(data => {
        setCurrencyList([data.base_code, ...Object.keys(data.rates)])
        console.log(data)
        const euroCurrency = Object.keys(data.rates)[43]
        setToCurrency(euroCurrency)
        setFromCurrency(data.base_code)
        setExchangeRate(data.rates[euroCurrency])
      })
  }, [])

  useEffect(() => {
    if (ToCurrency !== null && FromCurrency !== null) {
      fetch(`${BASE_URL}${FromCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[ToCurrency]);
          console.log(data);
        })
    }

  })

  return (
    <div>
      <h1>Convert</h1>
      <Input currencyList={currencyList} selectedCurrency={FromCurrency} onChangeCurrency={(event) => setFromCurrency(event.target.value)} amount={fromAmount} onChangeValue={inputFromEventHandler} />
      <div><p>=</p></div>
      <Input currencyList={currencyList} selectedCurrency={ToCurrency} onChangeCurrency={(event) => setToCurrency(event.target.value)} amount={toAmount} onChangeValue={inputToEventHandler} />
    </div>
  )
}

export default App;
