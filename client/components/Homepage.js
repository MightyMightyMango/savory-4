import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Container from '../theme/Container'
import HomePageBG from '../theme/HomePageBG'
import {StyledButton} from '../theme/Button.js'

import FadeIn from 'react-fade-in'

const Homepage = () => {
  return (
    <>
      <FadeIn>
        <Container primary>
          <HomepageContainer>
            <LogoTitle>less time looking...</LogoTitle>
            <Logo src="images/savory-logo.png" />
            <LogoTitle2>...more time cooking.</LogoTitle2>
            <SmallTxt>scroll for more</SmallTxt>
            <Arrow src="images/homepage/arrow.png" />
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
            <Image src="images/homepage/fetch.png" />
            <Image src="images/homepage/form.png" />
            <Image src="images/homepage/single-recipe.png" />
          </HomepageContainer>
          <HomepageContainer>
            <Number>2</Number>
            <Title>Manage your recipe books </Title>
            <Subtitle>
              To add a recipe book, go to the recipe books page and enter the
              name of the book and check off which of your recipes you would
              like to add to it.
            </Subtitle>
            <Image src="images/homepage/book.png" />
          </HomepageContainer>
          <HomepageContainer>
            <Number>3</Number>
            <Title>View your recipes by category </Title>
            <Subtitle>
              Go the the My Recipes page to enjoy your personalized collection
              of recipes and recipe books!
            </Subtitle>
            <Image src="images/homepage/weeknight.png" />
            <Image src="images/homepage/all-rcp.png" />
          </HomepageContainer>
          <form action="/login">
            <StyledButton type="submit" primary>
              Get started!
            </StyledButton>
          </form>
        </Container>
      </FadeIn>
    </>
  )
}

export default Homepage

const HomepageContainer = styled.div`
  margin-bottom: 150px;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: fadeIn ease 3s;
`

const Title = styled.div`
  margin: 7px;
  text-align: center;
  font-size: 1.5em;
  animation: rotate 1s linear infinite;
  animation-play-state: paused;
  animation-delay: calc(var(--scroll) * -1s);
`
const LogoTitle = styled.div`
  margin: 0px;
  text-align: center;
  font-size: 1.2em;
`
const LogoTitle2 = styled.div`
  margin: 0px;
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
  width: 30%;
  height: auto;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 50%;
  }
`

const Image = styled.img`
  width: 80%;
  height: auto;
`

const Arrow = styled.img``

const SmallTxt = styled.div`
  color: ${props => props.theme.colors.sage};
  font-size: 8px;
  margin-top: 150px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 300px;
  }
`
const TwoCol = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`
