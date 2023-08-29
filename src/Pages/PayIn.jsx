import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import Modal from '../components/modal/Modal'
import Seo from '../components/Seo'
import { BASE_URL } from '../Constants'
import { Root } from '../styles/global'

const PayIn = () => {
  const { UUID } = useParams()
  const navigate = useNavigate()
  const [payload, setPayload] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [timer, setTimer] = useState(null)
  const [timerRef, setTimerRef] = useState()
  const [updatingQuote, setUpdatingQuote] = useState(true)

  useEffect(() => {
    axios.get(`${BASE_URL}/${UUID}/summary`)
      .then((response) => {

        if (response.data.status.toLowerCase() == "expired") {
          navigate(`/payin/${UUID}/expired`)
        } 
        if (response.data.quoteStatus.toLowerCase() == "accepted") {
          navigate(`/payin/${UUID}/pay`)
        } else {
          setPayload(response.data)
        }
        
      }).catch((err) => {
        console.log(err)
      })
  }, [])

useEffect(() => {
  return () => {
    if(timerRef){
      clearInterval(timerRef);
    }
  }
}, [timerRef])

  function updateCountdown(startTime, currency) {

    const newInterval = setInterval(() => {
      const targetTimestamp = startTime;
      const currentTimestamp = new Date().getTime();
      const timeRemaining = targetTimestamp - currentTimestamp;

      if (timeRemaining <= 0) {
        setTimer(null);
        updateCurrency(currency);
      } else {

        const remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        let obj = { remainingSeconds, remainingMinutes, remainingHours }
        setTimer(obj);
      
      }
    }, 1000);

    setTimerRef(newInterval);
    setUpdatingQuote(false)
  }

  const updateCurrency = (currency) => {
    setUpdatingQuote(true)

    let data = {
      currency: currency,
      payInMethod: "crypto",
    }

    axios.put(`${BASE_URL}/${UUID}/update/summary`, data)
      .then((response) => {
        console.log(response.data)
        if (response.status == 200) {
          updateCountdown(response.data.acceptanceExpiryDate, currency)
          setPayload(response.data)
        

        }
      })
      .catch((err) => {
        console.log("err", err)
      })

  }

  const handleCurrencyChange = (currency) => {
    clearInterval(timerRef);
    setTimer(null)
    setIsValid(true)
    updateCurrency(currency)
  }

  return (
    <Root>
      <Seo
        title='Get Quote'
        />
      <Modal
        type={payload.status}
        payload={payload}
        timer={timer}
        updatingQuote={updatingQuote}
        handleCurrencyChange={handleCurrencyChange}
        isValid={isValid}
      />
    </Root>
  )
}

export default PayIn