import React from 'react'
import styled from 'styled-components'
import Button from '../theme/Button'

const ScrapeError = props => {
  return (
    <Error>
      <h2>Uh Oh! It looks like something went wrong on our end.</h2>
      <img width="80%" src="/images/spaghetti.jpeg" />
      <Button type="sumit">
        <a href="/recipes">Try another recipe</a>
      </Button>
    </Error>
  )
}

export default ScrapeError

const Error = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
`
