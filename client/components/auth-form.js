import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
// import LoginFieldDiv from '../theme/LoginFormContainer'
import Button from '../theme/Button'
import styled from 'styled-components'
import Container from '../theme/Container'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container primary>
      <LoginSignupWrapper>
        <form onSubmit={handleSubmit} name={name}>
          <LoginFieldDiv>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" required />
          </LoginFieldDiv>
          <LoginFieldDiv>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <Password name="password" type="password" required />
          </LoginFieldDiv>
          <ButtonDiv>
            <Button primary>{displayName}</Button>
            <Button type="submit" primary>
              <a href="/auth/google">{displayName} with Google</a>
            </Button>
          </ButtonDiv>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </LoginSignupWrapper>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

const LoginSignupWrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const Password = styled.input`
  width: 100%;
`

const LoginFieldDiv = styled.div`
  width: 100%;
`
const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
