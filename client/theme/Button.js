import React from 'react'
import styled from 'styled-components'
import theme from './theme.js'

export const StyledButton = styled.button`
  background-color: ${props => (props.primary ? '#8fbc8b' : '#C0C0C0')};
  color: #ffffff;
  border-radius: 2px;
  padding: 10px 5px;
  margin: 10px;
  margin-bottom: 10px;
  border: none;
  transition-duration: 0.4s;
  font-size: 1.25em;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  letter-spacing: 0.0625em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.05);
  max-width: 300px;
  overflow: wrap;

  :hover {
    background-color: ${props => (props.primary ? '#a0b39e' : '#DCDCDC')};
  }

  :focus {
    outline: 2px solid gray;
  }

  a {
    color: #ffffff;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1em;
    margin: 5px;
    max-width: ${props => (props.fullWidth ? '100%' : 'initial')};
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
