import React from 'react'
import styled from 'styled-components'

const Homepage = () => {
  return (
    <>
      <Container>
        <Title>Welcome to Savory!</Title>
      </Container>
    </>
  )
}

export default Homepage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  margin-top: 100px;
`

const Subtitle = styled.h3`
  font-size: 1em;
  text-align: center;
  margin: 20px;
`
