import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
// import LoginFieldDiv from '../theme/LoginFormContainer'
import Button from '../theme/Button'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import FadeIn from 'react-fade-in'

// import Container from '../theme/Container'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <FadeIn>
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
            {displayName === 'Login' ? (
              <h3>
                Not registered? <Link to="/signup">Create an account.</Link>
              </h3>
            ) : (
              <h3>
                Already registered? <Link to="/login">Sign in.</Link>
              </h3>
            )}
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </LoginSignupWrapper>
      </Container>
    </FadeIn>
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
      const email = evt.target.email.value.toLowerCase()
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.primary ? 'column' : 'row')};
  text-align: center;
  align-items: center;
  // width: 100%;
  padding-top: 180px;
  padding-bottom: 200px;
  background-color: darkseagreen;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 100px;
    padding-bottom: 200px;
  }
`

const LoginSignupWrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: white;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 6px 0 rgba(0, 0, 0, 0.05);

  a {
    color: darkseagreen;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 90%;
    padding: 20px;
  }
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
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;

  a {
    color: white;
  }
`
