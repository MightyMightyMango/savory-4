import React from 'react'
import styled from 'styled-components'

const StyledLoginDiv = styled.div`
  width: 100%;
  font-size: 0.75em;
`

const LoginFieldDiv = ({primary, children}) => {
  return <StyledLoginDiv>{children}</StyledLoginDiv>
}

export default LoginFieldDiv
