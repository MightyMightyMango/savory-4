import React from 'react'
import styled from 'styled-components'

const Homepage = () => {
  return (
    <>
      <Container>
        <Title>Welcome to</Title>
        <Logo src="images/savory-logo.png" />
        <Title>Log-in to save recipes!</Title>
      </Container>
    </>
  )
}

export default Homepage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  width: 100%;
  height: 87vh;
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`

const Subtitle = styled.h3`
  font-size: 1em;
  text-align: center;
  margin: 20px;
`

const Logo = styled.img`
  position: relative;
  width: 20%;
  height: auto;
`
