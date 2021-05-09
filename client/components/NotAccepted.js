import React from 'react'
import styled from 'styled-components'
import Button from '../theme/Button'

const NotAccepted = props => {
  return (
    <Error>
      <p>
        It looks like you used a link from a site that we don't support yet!
      </p>
      <p>Try collecting a recipe from one of our supported sites.</p>
      <Supported>
        <Title>Supported Sites:</Title>
        <Logos>
          <a href="https://www.allrecipes.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/all-recipes-bw.png"
            />
          </a>
          <a href="https://www.bonappetit.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/bon-appetit.png"
            />
          </a>
          <a href="http://www.eatingwell.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/eating-well-bw.png"
            />
          </a>
          <a href="https://www.foodnetwork.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/food-network-bw.png"
            />
          </a>
          <a href="https://cooking.nytimes.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/nyt-cooking-bw.png"
            />
          </a>
          <a href="https://www.simplyrecipes.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/simply-recipes-bw.png"
            />
          </a>
          <a href="https://gimmedelicious.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/gimme-delicious-bw.png"
            />
          </a>
          <a href="https://tasty.co/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/tasty-bw.png"
            />
          </a>
          <a href="https://www.cookingclassy.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/cooking-classy-bw.png"
            />
          </a>
          <a href="https://www.spendwithpennies.com/" target="_blank" rel="noreferrer">
            <img
              className="supported-logo"
              src="/images/supported/spend-with-pennies-bw.jpg"
            />
          </a>
        </Logos>
      </Supported>
      <Button type="submit" primary>
        <a href="/recipes">Try another recipe</a>
      </Button>
    </Error>
  )
}

export default NotAccepted

const Error = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
`

const Supported = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
  padding-top: 10px;
  width: 70%;
  margin-bottom: 40px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 90%;
  }
`

const Logos = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: 2px solid black;
  .supported-logo {
    padding: 10px;
    height: 55px;
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      height: 40px;
      padding: 7px;
    }
  }
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.3em;
  font-family: 'Merriweather', sans serif;
`
