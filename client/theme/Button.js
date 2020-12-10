import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button`
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
  font-weight: 500;
  letter-spacing: 0.0625em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.05);
  max-width: 300px;

  :hover {
    background-color: ${props => (props.primary ? '#a0b39e' : '#DCDCDC')};
  }

  a {
    color: #ffffff;
  }
`

const Button = ({primary, children, onClick, otherProps}) => {
  return (
    <StyledButton
      primary={primary}
      type="submit"
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </StyledButton>
  )
}

export default Button
