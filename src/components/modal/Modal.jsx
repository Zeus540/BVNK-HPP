import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { motion as m  } from 'framer-motion'
import PayIn from '../PayIn'
import Expired from '../Expired'
import PayInPayment from '../PayInPayment'


const Root = styled(m.div)`
display: inline-flex;
max-width: 460px;
padding: 25px;
flex-direction: column;
align-items: center;
gap: 25px;
border-radius: 10px;
background: #FFF;
width: 100%;
`


const Modal = ({type,payload,handleCurrencyChange,isValid,timer,updatingQuote}) => {

   const [form, setForm] = useState(<></>)

   useEffect(() => {
   
    if(type){
     
        
    let modals = {
        "pending" : 
        <PayIn 
        payload={payload} 
        handleCurrencyChange={handleCurrencyChange} 
        isValid={isValid} 
        timer={timer} 
        updatingQuote={updatingQuote}
        />
        ,
        "accepted" : 
        <PayInPayment 
        payload={payload} 
        timer={timer} 
        />
        ,
        "expired" : 
        <Expired 
        payload={payload}
        />,
       
    }

    switch (type?.toLowerCase()) {
        case "pending":
            setForm(modals[type?.toLowerCase()])
            break;
            case "accepted":
            setForm(modals[type?.toLowerCase()])
            break;
            case "expired":
                setForm(modals[type?.toLowerCase()])
            break;
        default:
            setForm(<></>)
            break;
    }
}
   }, [type,isValid,payload,timer,updatingQuote])
   

  return (
    <Root
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >
    {form}
    </Root>
  )
}

export default Modal