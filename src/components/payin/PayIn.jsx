import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'
import Currency from '../currency/Currency'
import Loader from '../Loader'
import { BASE_URL } from '../../Constants'
import { Divider, Heading,ReferenceText,Button,Section,SectionText } from '../../styles/global'
import { Price } from './payin_styles'

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
          <Section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Divider />
            <SectionText>Amount due {updatingQuote ? <Loader width={20} height={20} color='blue' /> : <span>{payload?.paidCurrency?.amount} {payload?.paidCurrency?.currency} </span>}</SectionText>
            <Divider />
            <SectionText>Quoted price expires in {timer == null ? <Loader width={20} height={20} color='blue' /> : <span>{timer?.remainingSeconds}:{timer?.remainingMinutes}:{timer?.remainingHours}</span>}</SectionText>
            <Divider />
          </Section>

          <Section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button disabled={check} onClick={() => { handleSubmit() }} check={check}>
              Confirm
            </Button>
          </Section>
        </>
        :
        null}
    </>
  )
}

export default PayIn

