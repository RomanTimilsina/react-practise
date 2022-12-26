import React from 'react'

export default function CurrencyRow({currencyOptions,handleInputChange ,amount, select, handleAmount}) {
  return (
    <div>
      <input type='number' value={amount} className='input' onChange = {handleAmount} />
      <select value={select} onChange={handleInputChange}>
      {currencyOptions.map(option => (
        <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
