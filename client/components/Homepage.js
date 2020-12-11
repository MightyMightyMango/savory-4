import React from 'react'
import styled from 'styled-components'
import Container from '../theme/Container'
import HomePageBG from '../theme/HomePageBG'

import FadeIn from 'react-fade-in'

const Homepage = () => {
  return (
    <>
      <FadeIn>
        <Container primary>
          <Title>Welcome to</Title>
          <Logo src="images/savory-logo.png" />
          <Title>Log-in to save recipes!</Title>
        </Container>
      </FadeIn>
    </>
  )
}

export default Homepage

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

const Circle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 1;
`
