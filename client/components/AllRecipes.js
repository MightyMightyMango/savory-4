import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setAllRecipesThunk, deleteRecipeThunk} from '../store/recipes'
import {NavLink} from 'react-router-dom'

export const AllRecipes = props => {
  const {recipes, getAllRecipes, deleteRecipe} = props

  useEffect(() => {
    getAllRecipes(props.user.id)
  }, [])

  const handleDeleteRecipe = (event, recipeId) => {
    event.preventDefault()
    console.log('event ', event)
    deleteRecipe(recipeId)
  }

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
              <NavLink to={`/recipes/${recipe.id}`}>
                <button type="submit">View Recipe</button>
              </NavLink>
              {recipe.isDraft ? (
                <button
                  type="submit"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this draft?'
                      )
                    )
                      handleDeleteRecipe(event, recipe.id)
                  }}
                >
                  Delete Draft
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this recipe?'
                      )
                    )
                      handleDeleteRecipe(event, recipe.id)
                  }}
                >
                  Delete Recipe
                </button>
              )}
            </Recipe>
          ))}
        </RecipesContainer>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes.allRecipes
})

const mapDispatch = dispatch => ({
  getAllRecipes: userId => dispatch(setAllRecipesThunk(userId)),
  deleteRecipe: recipeId => dispatch(deleteRecipeThunk(recipeId))
})

export default connect(mapState, mapDispatch)(AllRecipes)

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  align-self: center;
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
  padding-bottom: 5px;
`

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
  padding-bottom: 20px;
`
