import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import setUserAllRecipes from '../store/recipes'
import Link from 'react-router-dom'

export const AllRecipes = props => {
  // useEffect(() => {
  //   getUserAllRecipes(props.user.id)
  // })

  console.log('props ', props)
  console.log('props.user.recipes ', props.user.recipes)

  const {recipes} = props.user

  return (
    <>
      <Container>
        <Title>My Recipes</Title>
        <RecipesContainer>
          {recipes.map(recipe => (
            <Recipe key={recipe.id}>
              <Image src={recipe.imageUrl} />
              <Subtitle>{recipe.name}</Subtitle>
              <Subtitle>Source: {recipe.publisher}</Subtitle>
              <button type="submit">View Recipe</button>
            </Recipe>
          ))}
        </RecipesContainer>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes
})

const mapDispatch = dispatch => ({
  getUserAllRecipes: userId => {
    dispatch(setUserAllRecipes(userId))
  }
})

export default connect(mapState, mapDispatch)(AllRecipes)

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 87vh;
`
const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  padding-top: 20px;
`

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-contents: flex-start;
  padding: 30px;
  width: calc(33.333333% - 30px);
`

const Subtitle = styled.div`
  font-size: 1em;
`

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
  padding-bottom: 20px;
`
