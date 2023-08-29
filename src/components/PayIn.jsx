import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'
import styled from 'styled-components'
import Currency from './Currency'
import { motion as m } from 'framer-motion'
import Loader from './Loader'
import { BASE_URL } from '../Constants'
import { Divider, Heading } from '../styles/global'


const Price = styled.p`
color:  #0A1628;
text-align: center;
font-family: Inter;
font-size: 32px!important;
font-style: normal;
font-weight: 600;
line-height: 40px; 
span{
font-size: 20px!important;
font-weight: 600;
}
`

const ReferenceText = styled.p`
color: #556877;
text-align: center;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px; 
span{
    color:  #0A1628;
font-family: Inter;

font-style: normal;
font-weight: 500;
line-height: 22px;
}
`

const Button = styled.button`
display: flex;
width:100%;
justify-content: center;
align-items: center;
background: ${(props) => props.check ? "#b5b5b5" : "#3F53DD"};
color: white;
padding:8px 16px;
border-radius: 4px;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px;
cursor:pointer;
transition:background 0.2s ease;
border: none;
:hover{
  background: ${(props) => props?.check ? "#b5b5b5" : "#1f34c5"} 
}
`

const IsValidSection = styled(m.div)`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
`
const IsValidSectionText = styled(m.div)`
display: flex;
width:100%;
justify-content: center;
align-items: center;
justify-content: space-between;
padding:12px 0px;
color: #556877;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px;
span{
  color: #0A1628;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 22px; /* 157.143% */
}

`

function PayIn({ payload, handleCurrencyChange, isValid, timer, updatingQuote }) {
  const { UUID } = useParams()
  const navigate = useNavigate()
  const [check, setCheck] = useState(false)

  const handleSubmit = () => {
    setCheck(true)
    let data = {
      successUrl: "no_url"
    }

    axios.put(`${BASE_URL}/${UUID}/accept/summary`, data)
      .then((response) => {

        if (response.status == 200) {
          navigate(`/payin/${UUID}/pay`)
          setCheck(false)
        }
      })
      .catch((err) => {
        console.log("err", err)
      })

  }

  useEffect(() => {
    
    if (updatingQuote) {
      setCheck(true)
    } else {
      setCheck(false)
    }


  }, [updatingQuote])

  return (
    <>
      <div>
        <Heading>{payload?.merchantDisplayName}</Heading>
        <Price>{payload?.displayCurrency?.amount} <span>{payload?.displayCurrency?.currency}</span></Price>
      </div>
      <ReferenceText>For reference number: <span>{payload?.reference}</span></ReferenceText>
      <Currency
        label="Pay With"
        handleCurrencyChange={handleCurrencyChange}
      />

      {isValid ?
        <>
          <IsValidSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Divider />
            <IsValidSectionText>Amount due {updatingQuote ? <Loader width={20} height={20} color='blue' /> : <span>{payload?.paidCurrency?.amount} {payload?.paidCurrency?.currency} </span>}</IsValidSectionText>
            <Divider />
            <IsValidSectionText>Quoted price expires in {timer == null ? <Loader width={20} height={20} color='blue' /> : <span>{timer?.remainingSeconds}:{timer?.remainingMinutes}:{timer?.remainingHours}</span>}</IsValidSectionText>
            <Divider />
          </IsValidSection>

          <IsValidSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button disabled={check} onClick={() => { handleSubmit() }} check={check}>
              Confirm
            </Button>
          </IsValidSection>
        </>
        :
        null}
    </>
  )
}

export default PayIn

