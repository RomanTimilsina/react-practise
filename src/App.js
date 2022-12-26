import { useEffect, useState } from 'react';
import './App.css'
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.currencyfreaks.com/currency-symbols'



function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [inFrom, setInFrom] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()
  
  let toAmount, fromAmount
  if(inFrom){
    fromAmount = amount
    toAmount = amount*exchangeRate
  }
  else
  {
    toAmount = amount
    fromAmount = amount/exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        setCurrencyOptions([...Object.keys(data)])
        setFromCurrency([...Object.keys(data)][0])
        setToCurrency([...Object.keys(data)][1])
  })
  },[])
  
  useEffect(() => {
    fetch('https://api.currencyfreaks.com/latest?apikey=abb36491c2d04d02a73898c5888db206')
    .then(res => res.json())
    .then(data => {
      setExchangeRate(data.rates[toCurrency]/data.rates[fromCurrency])
  })
  },[toCurrency,fromCurrency])


  function handleFromAmount(e){
    setInFrom(true)
    setAmount(e.target.value)
    
  }

  function handleToAmount(e){
    setInFrom(false)
    setAmount(e.target.value)
    
  }

  return (
    <>
      <h1> Convert </h1>
      <CurrencyRow 
      select = {fromCurrency} 
      currencyOptions = {currencyOptions}
      amount = {fromAmount}
      handleInputChange={(e) => setFromCurrency(e.target.value)}
      handleAmount = {handleFromAmount}
      />
      <div className='equals'> = </div>
      <CurrencyRow 
      select = {toCurrency} 
      currencyOptions = {currencyOptions}
      amount = {toAmount} 
      handleInputChange={(e) => setToCurrency(e.target.value)}
      handleAmount = {handleToAmount}
      />
    </>
  );
}

export default App;
