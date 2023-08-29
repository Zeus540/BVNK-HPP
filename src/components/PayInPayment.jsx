import React,{ useEffect,useState } from 'react'
import Loader from './Loader'
import QrCode from './qr/QrCode'
import { useSnackbar } from 'notistack'
import { ReferenceText,SectionText,Holder,Divider,Heading } from '../styles/global'

const PayInPayment = ({payload,timer}) => {
const [cypto, setCypto] = useState("")
const  {enqueueSnackbar} = useSnackbar()

const handleCopyClick = async (e) => {
  try {
    await navigator.clipboard.writeText(e.target.value);
    enqueueSnackbar(`Copied to clipboard`,{variant:'success'})
  } catch (err) {
  }
};

useEffect(() => {
  switch (payload?.paidCurrency?.currency.toLowerCase()) {
    case 'btc':
        setCypto("Bitcoin")
        break;
    case 'eth':
        setCypto("Ethereum")
        break;
    case 'ltc':
        setCypto("Litecoin")
        break;
    default:
        break;
  }
}, [payload])

  return (
    <>
        <div>
            <Heading>Pay with {cypto}</Heading>
           
        </div>
        <ReferenceText>To complete this payment send the amount<br/>due to the {payload?.paidCurrency?.currency} address provided below</ReferenceText>

        <Holder>
        <Divider/>
        <SectionText width="40%" extra={true}>Amount due {timer == null  ? 
        <Loader width={20} height={20} color='blue'/> :
        <span>
          <div>{payload?.paidCurrency?.amount} {payload?.paidCurrency?.currency} </div>
           <button value={payload?.paidCurrency?.amount}  onClick={(e) =>handleCopyClick(e)}>Copy</button>
           </span>
           }
        </SectionText>
        <Divider/>
        <SectionText width="40%" extra={true}>
          {payload?.paidCurrency?.currency} address {timer == null  ? 
          <Loader width={20} height={20} color='blue'/> 
          : <span>
            <div>{payload?.address?.address}</div>
             <button value={payload?.address?.address}  onClick={(e) =>handleCopyClick(e)}>Copy</button>
             </span>
          }
          </SectionText>
          
          <QrCode url={payload?.address?.uri} address={payload?.address?.address}/>
        
        <Divider/>
        <SectionText width="40%" extra={true}>Time left to pay{timer == null  ? <Loader width={20} height={20} color='blue'/> : <span>{timer?.remainingSeconds}:{timer?.remainingMinutes}:{timer?.remainingHours}</span>}</SectionText>
        <Divider/>
        </Holder>
    </>
  )
}

export default PayInPayment