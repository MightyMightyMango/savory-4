import React from 'react'
import {Login, Signup} from './index'
import Container from '../theme/Container'
import HalfPageDiv from '../theme/HalfPageDiv'

const LoginSignup = props => {
  return (
    <Container>
      <HalfPageDiv>
        Already have an account? Log-in:
        <Login />
      </HalfPageDiv>

      <HalfPageDiv>
        New to Savory? Sign up for an account:
        <Signup />
      </HalfPageDiv>
    </Container>
  )
}

export default LoginSignup
