import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Modal from '../components/modal/Modal'
import { useParams,useNavigate} from 'react-router'
import Seo from '../components/Seo'
import { Root } from '../styles/global'
import { BASE_URL } from '../Constants'

const PayInPayment = () => {
  const { UUID } = useParams()
  const [payload, setPayload] = useState('')
  const navigate = useNavigate()
  const [timer, setTimer] = useState(null)
  const [timerRef, setTimerRef] = useState()

  useEffect(() => {
    axios.get(`${BASE_URL}/${UUID}/summary`)
      .then((response) => {
        if (response.data.status.toLowerCase() == "expired") {
          navigate(`/payin/${UUID}/expired`)
        }
        if(response.data.paidCurrency.currency == null){
          navigate(`/payin/${UUID}`)
        }else {
          updateCountdown(response.data.expiryDate)
          setPayload(response.data)
        }
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    clearInterval(timer);

    return (()=>{
      clearInterval(timer);
    })
  }, [timer])

  function updateCountdown(startTime) {

    if (timerRef) {
      clearInterval(timerRef);
    }
    const newInterval = setInterval(() => {
      const targetTimestamp = startTime;
      const currentTimestamp = new Date().getTime();
      const timeRemaining = targetTimestamp - currentTimestamp;
      if (timeRemaining <= 0) {
        clearInterval(newInterval);
        navigate(`/payin/${UUID}/expired`)
      } else {
        const remainingHours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        let obj = { remainingSeconds, remainingMinutes, remainingHours }
        setTimer(obj);
      }
    }, 1000);
    setTimerRef(newInterval);
  }

  return (
    <Root>
      <Seo
      title='Quote Accepted'
      />
        <Modal
        type={'accepted'}
        payload={payload}
        timer={timer}
      />
      </Root>
  )
}

export default PayInPayment