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
          <HomepageContainer>
            <Title>Welcome to</Title>
            <Logo src="images/savory-logo.png" />
            <Title>Log-in to save recipes!</Title>
          </HomepageContainer>
          <HomepageContainer>
            <Title>Why Savory?</Title>
            <Subtitle>
              Tired of keeping track of recipes from around the web in various
              places like your notes and screenshots? Well now you can keep them
              all in one place, with Savory.
            </Subtitle>
          </HomepageContainer>
          <HomepageContainer>
            <Number>1</Number>
            <Title>Fetch a Recipe</Title>
            <Subtitle>
              Enter a recipe that you would like to save. Make any edits you
              would like in the form, then confirm the recipe.
            </Subtitle>

            <Image src="images/homepage/fetch-recipe.png" />
            <Image src="images/homepage/form.png" />
          </HomepageContainer>
          <HomepageContainer>
            <Number>2</Number>
            <Title>Manage your recipe books </Title>
            <Subtitle>
              To add a recipe book, go to the recipe books page and enter the
              name of the book and check off which of your recipes you would
              like to add to it.
            </Subtitle>
            <Image src="images/homepage/recipe-book.png" />
          </HomepageContainer>
          <HomepageContainer>
            <Number>3</Number>
            <Title>View your recipes by category </Title>
            <Subtitle>
              Go the the My Recipes page to enjoy your personalized collection
              of recipes and recipe books!
            </Subtitle>
            <Image src="images/homepage/cocktails.png" />
            <Image src="images/homepage/all.png" />
          </HomepageContainer>
        </Container>
      </FadeIn>
    </>
  )
}

export default Homepage

const HomepageContainer = styled.div`
  margin-bottom: 250px;
`

const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`

const Number = styled.div`
  text-align: center;
  font-size: 1.8em;
  font-weight: bold;
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

const Image = styled.img`
  width: 80%;
  height: auto;
`
const TwoCol = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`
