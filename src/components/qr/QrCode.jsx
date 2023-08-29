import React from 'react'
import QRCode from 'qrcode.react';
import { QrCodeHolder } from './qr_code_styles';

const QrCode = ({url,address}) => {
  return (
    <QrCodeHolder>
    <QRCode value={url} />
    <p>{address}</p>
    </QrCodeHolder>
  )
}

export default QrCode