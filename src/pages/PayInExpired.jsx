import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../components/modal/Modal'
import { useParams, useNavigate } from 'react-router'
import Seo from '../components/Seo'
import { Root } from '../styles/global'
import { BASE_URL } from '../utils/Constants'

const PayInExpired = () => {
  const [payload, setPayload] = useState('')
  const navigate = useNavigate()
  const { UUID } = useParams()

  useEffect(() => {
    axios.get(`${BASE_URL}/${UUID}/summary`)
      .then((response) => {
        setPayload(response.data)
        console.log(response.data)
          if (response.data.status.toLowerCase() == 'pending') {
            navigate(`/payin/${UUID}`)
          }
       
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Root>
      <Seo
        title='Quote Expired'
      />
      <Modal
        type={payload.status}
        payload={payload}
      />
    </Root>
  )
}

export default PayInExpired

