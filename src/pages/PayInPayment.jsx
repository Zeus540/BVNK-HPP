import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Modal from '../components/modal/Modal'
import { useParams,useNavigate} from 'react-router'
import Seo from '../components/Seo'
import { Root } from '../styles/global'
import { BASE_URL } from '../utils/Constants'
import { updateCountdown } from '../utils/helpers'

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
        else {
          updateCountdown(response.data.expiryDate, "",setTimer,setTimerRef,"",`/payin/${UUID}/expired`)
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