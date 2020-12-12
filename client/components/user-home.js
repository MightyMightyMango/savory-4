import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SuggestionBox from './SuggestionBox'

import Container from '../theme/Container'
import styled from 'styled-components'
import Button from '../theme/Button'

import FadeIn from 'react-fade-in'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, lastName, email, userId} = props

  return (
    <Container primary>
      <FadeIn>
        <UserAccount>
          <div>
            {firstName ? (
              <Welcome>Welcome, {email}</Welcome>
            ) : (
              <Welcome>Welcome!</Welcome>
            )}
          </div>
          <Row>
            <Column>
              <h2>ACCOUNT INFO:</h2>
            </Column>
          </Row>
          <Row>
            <Column className="col-left">
              <h3>First Name:</h3>
            </Column>
            <Column>
              <h3>{firstName}</h3>
            </Column>
            <Column>
              <Button primary>Edit</Button>
            </Column>
          </Row>
          <Row>
            <Column className="col-left">
              <h3>Last Name:</h3>
            </Column>
            <Column>
              <h3>{lastName}</h3>
            </Column>
            <Column>
              <Button primary>Edit</Button>
            </Column>
          </Row>
          <Row>
            <Column className="col-left">
              <h3>Email:</h3>
            </Column>
            <Column>
              <h3>{email}</h3>
            </Column>
            <Column>
              <Button primary>Edit</Button>
            </Column>
          </Row>
          <Row>
            <Column className="col-left">
              <h3>Password:</h3>
            </Column>
            <Column>
              <h3>(hidden)</h3>
            </Column>
            <Column>
              <Button primary>Edit</Button>
            </Column>
          </Row>
        </UserAccount>
        <SuggestionBox userId={userId} />
      </FadeIn>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    userId: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

const UserAccount = styled.div`
  text-align: left;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100px;
`

const Column = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-basis: 100%;
  flex: 1;
  text-align: left;
  justify-content: center;

  .col-left {
    min-width: 150px;
  }
`

const Welcome = styled.h1`
  font-family: 'Merriweather', serif;
`
