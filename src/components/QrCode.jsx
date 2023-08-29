import React from 'react'
import QRCode from 'qrcode.react';
import styled from 'styled-components'

const QrCodeHolder = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 15px 0px;
    p{
        margin-top: 10px;
        color: #556877;
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        word-break: break-word;
    }
`

const QrCode = ({url,address}) => {
  return (
    <QrCodeHolder>
    <QRCode value={url} />
    <p>{address}</p>
    </QrCodeHolder>
  )
}

export default QrCode