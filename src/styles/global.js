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


export const ReferenceText = styled.p`
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

export const Button = styled.button`
display: flex;
width:100%;
justify-content: center;
align-items: center;
background: ${(props) => props.check ? "#b5b5b5" : "#3F53DD"};
color: white;
padding:8px 16px;
border-radius: 4px;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px;
cursor:pointer;
transition:background 0.2s ease;
border: none;
:hover{
  background: ${(props) => props?.check ? "#b5b5b5" : "#1f34c5"} 
}
`

export const Section = styled(m.div)`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
`
export const SectionText = styled(m.div)`
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
width: ${(props) =>props.extra ? props.width : "unset"};
justify-content: flex-end;
}

${(props) =>
    props.extra &&
    `
    div {
      overflow: hidden;
    }
    button {
      color: blue;
      cursor: pointer;
      margin-left: 5px;
    }
  `}

`

export const Holder = styled(m.div)`
width: ${(props) =>props.extra ? props.width : "100%"};
`