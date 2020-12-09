import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  margin-top: 10px;
  background-color: ${props => (props.primary ? '#8fbc8b' : '#C0C0C0')};
  color: #ffffff;
  border-radius: 2px;
  padding: 10px 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  border: none;
  transition-duration: 0.4s;
  height: 50px;
  font-size: 1.25em;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.0625em;

  :hover {
    background-color: ${props => (props.primary ? '#a0b39e' : '#DCDCDC')};
  }

  a {
    color: #ffffff;
  }
`

const Button = ({primary, children}) => {
  return (
    <StyledButton primary={primary} type="submit">
      {children}
    </StyledButton>
  )
}

export default Button
