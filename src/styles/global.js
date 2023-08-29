import styled from 'styled-components'
import { motion as m } from 'framer-motion'


export const Heading = styled.h1`
color:  #0A1628;
text-align: center;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 28px;
`

export const Root = styled(m.div)`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background: #EBEDF3;
padding: 20px;
`

export const Divider = styled(m.div)`
background: #E3E8EE;
height: 1px;
align-self: stretch;
`