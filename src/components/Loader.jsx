import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = ({width,height,color}) => {
  return (
<Oval
  height={height}
  width={width}
  color={color}
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor={color}
  strokeWidth={5}
  strokeWidthSecondary={5}

/>
  )
}

export default Loader