import React, { useEffect } from 'react';
import { Block } from './Block';
import './index.scss';
import { curse } from './date/curse'


function App() {
  // const [rates, setRates] = React.useState({}) 
  // const ratesRef = React.useRef({})
  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('RUB')
  const [fromPrice, setFromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(0)


  // C API
  // React.useEffect(() => {
  //   fetch('link')
  //     .then(res => res.json())
  //     .then(json => setRates(json.rates))
          // .then((json) => {reatesRef.current = json.rates})
  //     .catch(err => {
  //       console.warn(err)
  //       alert('Не удалось получить информацию')
  //     })
  // }, [])

  const onChangeFromPrice = (value) => {
    const price = value / curse.rates[fromCurrency]
    const result = price * curse.rates[toCurrency]
    // const price = value / ratesRef.current[fromCurrency]
    // const result = price * ratesRef.current[toCurrency]
    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }

  const onChangeToPrice = (value) => {
    const result = (curse.rates[fromCurrency] / curse.rates[toCurrency]) * value
    // const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setToPrice(value)
    setFromPrice(result.toFixed(3))
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  
  return (
    <div className="App">
      <Block  currency={fromCurrency} value={fromPrice} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block  value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
