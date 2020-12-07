import React from 'react'
import {Login, Signup} from './index'

const LoginSignup = props => {
  return (
    <div className="content-wrapper">
      <div className="border-box">
        Already have an account? Log-in:
        <Login />
      </div>

      <div className="border-box">
        New to Savory? Sign up for an account:
        <Signup />
      </div>
    </div>
  )
}

export default LoginSignup
