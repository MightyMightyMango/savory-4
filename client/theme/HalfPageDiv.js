import React from 'react'
import styled from 'styled-components'

const LoginSignupDiv = styled.div`
  width: calc(40% - 20px);
  padding: 20px;
  background-color: gainsboro;
  font-size: 1.5em;
  color: #000000;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.05);
  z-index: 6;
`
const HalfPageDiv = ({primary, children}) => {
  return <LoginSignupDiv>{children}</LoginSignupDiv>
}

export default HalfPageDiv
