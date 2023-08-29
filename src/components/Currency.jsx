import React,{useState} from 'react'
import { Select,MenuItem,InputLabel } from '@mui/material'
import styled from 'styled-components'



const Root = styled.div`
width: 100%;
`
const StyledLabel = styled(InputLabel)`
color: #0A1628!important;
font-family: Inter!important;
font-size: 14px!important;
font-style: normal!important;
font-weight: 500!important;
line-height: 20px!important;

padding-bottom: 4px!important;
`
const StyledSelect = styled(Select)`
width: 100%;
font-size: 14px!important;
font-style: normal!important;
font-weight: 500!important;
line-height: 20px!important;
color: #0A1628!important;
`

const StyledMenuItem = styled(MenuItem)`
width: 100%;
font-size: 14px!important;
font-style: normal!important;
font-weight: 500!important;
line-height: 20px!important;
color: #0A1628!important;
`

const Currency = ({handleCurrencyChange,label}) => {

    const [value, setValue] = useState('Select Currency')

    const handleChange = (event) => {
    
      if(event.target.value !== "Select Currency"){
        setValue(event.target.value)
          handleCurrencyChange(event.target.value)
      }
    };

  return (
    <Root>
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
  </Root>
  )
}

export default Currency