import React,{ useEffect,useState } from 'react'
import { Divider,Heading } from '../styles/global'
import styled from 'styled-components'
import { motion as m  } from 'framer-motion'
import Loader from './Loader'
import QrCode from './QrCode'


const PaymentInfoSection = styled.div`
width: 100%;
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
line-height: 22px; 
display: flex;
overflow: hidden;
max-width: 52%;
justify-content: flex-end;
div{
 
    overflow: hidden;
}
  button{
    color: blue;
    cursor: pointer;
 margin-left:5px
  }
}

`


const PayInPayment = ({payload,timer}) => {
const [cypto, setCypto] = useState("")

const handleCopyClick = async (e) => {

  try {
    await navigator.clipboard.writeText(e.target.value);
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

        <PaymentInfoSection>
        <Divider/>
        <IsValidSectionText>Amount due {timer == null  ? 
        <Loader width={20} height={20} color='blue'/> :
        <span>
          <div>{payload?.paidCurrency?.amount} {payload?.paidCurrency?.currency} </div>
           <button value={payload?.paidCurrency?.amount}  onClick={(e) =>handleCopyClick(e)}>Copy</button>
           </span>
           }
        </IsValidSectionText>
        <Divider/>
        <IsValidSectionText>
          {payload?.paidCurrency?.currency} address {timer == null  ? 
          <Loader width={20} height={20} color='blue'/> 
          : <span>
            <div>{payload?.address?.address}</div>
             <button value={payload?.address?.address}  onClick={(e) =>handleCopyClick(e)}>Copy</button>
             </span>
          }
          </IsValidSectionText>
          
          <QrCode url={payload?.address?.uri} address={payload?.address?.address}/>
        
        <Divider/>
        <IsValidSectionText>Time left to pay{timer == null  ? <Loader width={20} height={20} color='blue'/> : <span>{timer?.remainingSeconds}:{timer?.remainingMinutes}:{timer?.remainingHours}</span>}</IsValidSectionText>
        <Divider/>
        </PaymentInfoSection>
    </>
  )
}

export default PayInPayment