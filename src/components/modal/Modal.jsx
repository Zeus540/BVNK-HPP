import React,{useState,useEffect} from 'react'
import PayIn from '../payin/PayIn'
import Expired from '../expired/Expired'
import PayInPayment from '../PayInPayment'
import { Root } from './modal_styles'


const Modal = ({type,payload,handleCurrencyChange,isValid,timer,updatingQuote}) => {

   const [form, setForm] = useState(null)

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
   <>
    {form ? 
        <Root
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        {form}
        </Root>:
        null
    }
   </>
   
  )
}

export default Modal