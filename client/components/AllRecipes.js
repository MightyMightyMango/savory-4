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
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <Image src={recipe.imageUrl} />
            <Subtitle>{recipe.name}</Subtitle>
            <button type="submit">View Recipe</button>
          </div>
        ))}
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

const Subtitle = styled.div`
  font-size: 1em;
`

const Image = styled.img`
  width: 25%;
`
