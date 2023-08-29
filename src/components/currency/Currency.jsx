import React,{useState} from 'react'
import { StyledLabel,StyledSelect,StyledMenuItem } from './currency_styles'
import {Holder} from '../../styles/global'


const Currency = ({handleCurrencyChange,label}) => {

    const [value, setValue] = useState('Select Currency')

    const handleChange = (event) => {
    
      if(event.target.value !== "Select Currency"){
        setValue(event.target.value)
          handleCurrencyChange(event.target.value)
      }
    };

  return (
    <Holder>
        <StyledLabel id={label}>{label}</StyledLabel>
        <StyledSelect
        labelId={label}
        onChange={(e)=>handleChange(e)}
        value={value}
        >
      <StyledMenuItem value="Select Currency">Select Currency</StyledMenuItem>
        <StyledMenuItem value='BTC'>BTC</StyledMenuItem>
        <StyledMenuItem value="ETH">ETH</StyledMenuItem>
        <StyledMenuItem value="LTC">LTC</StyledMenuItem>
        </StyledSelect>
  </Holder>
  )
}

export default Currency