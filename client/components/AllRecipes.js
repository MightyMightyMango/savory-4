import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  setAllRecipesThunk,
  deleteRecipeThunk,
  getUserCategoriesThunk,
  getRecipesInCategoryThunk,
  submitCategory
} from '../store/recipes'
import {NavLink} from 'react-router-dom'
// import EditCategories from './EditCategories'
import Button from '../theme/Button'
import {StyledButton} from '../theme/Button.js'
import Link from 'react-router-dom'

import FadeIn from 'react-fade-in'

export const AllRecipes = props => {
  // categories contains all the categories
  // to filter by category, pass the userId and categoryId into getRecipesInCategory
  const [showForm, toggleShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const {
    user,
    recipes,
    getAllRecipes,
    deleteRecipe,
    getCategories,
    getRecipesInCategory
  } = props

  const categories = props.categories || []

  useEffect(() => {
    getAllRecipes(props.user.id)
    getCategories(props.user.id)
  }, [])

  const handleDeleteRecipe = (event, recipeId) => {
    event.preventDefault()
    console.log('event ', event)
    deleteRecipe(recipeId)
  }

  const getRecipesFromCategory = event => {
    event.preventDefault()
    console.log('recipes by Category')
    console.log('event.targ.value', event.target.value)
    getRecipesInCategory(user.id, event.target.value)
  }

  // const getAllRecipesFunc = event => {
  //   getAllRecipes(props.user.id)
  // }
  return (
    <>
      <Container>
        <FadeIn>
          {/* <Title>My Recipe Books</Title> */}
          {/* {getRecipesFromCategory} */}
          <Title height="70px">My Recipes</Title>
          <CategoriesContainer>
            <h2>Categories</h2>
            <Categories>
              {Array.isArray(categories) ? (
                categories.map(category => (
                  <StyledButton
                    key={'c' + category.id}
                    type="submit"
                    value={category.id}
                    onClick={() => getRecipesFromCategory(event)}
                  >
                    {category.category}
                  </StyledButton>
                ))
              ) : (
                <div>No Categories</div>
              )}

              <StyledButton onClick={() => getAllRecipes(props.user.id)}>
                ALL
              </StyledButton>
            </Categories>
          </CategoriesContainer>
          <RecipesContainer>
            {Array.isArray(recipes) ? (
              recipes.map(recipe => (
                <Recipe key={'r' + recipe.id}>
                  <Image src={recipe.imageUrl} />
                  <NavLink className="navlink" to={`/recipes/${recipe.id}`}>
                    <Button primary>View Recipe</Button>
                  </NavLink>
                  <Title>{recipe.name}</Title>
                  {/* <Subtitle>Source: {recipe.publisher}</Subtitle> */}
                  {/* {recipe.isDraft ? (
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
                )} */}
                </Recipe>
              ))
            ) : (
              <div />
            )}
          </RecipesContainer>
          {/* <CategoriesContainer>
          <Title>Categories</Title>
          {Array.isArray(categories) ? (
            categories.map(category => (
              <>
                <button
                  type="submit"
                  value={category.id}
                  onClick={() => getRecipesFromCategory(event)}
                >
                  {category.category}
                </button>
              </>
            ))
          ) : (
            <div />
          )}
          <button type="submit" onClick={() => displayForm(event)}>
            Add or Edit Recipe Books
          </button>
          {Form()}
        </CategoriesContainer> */}
        </FadeIn>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes.allRecipes,
  categories: state.recipes.categories,
  recipesByCat: state.recipes.recipesByCategory
})

const mapDispatch = dispatch => ({
  getAllRecipes: userId => dispatch(setAllRecipesThunk(userId)),
  deleteRecipe: recipeId => dispatch(deleteRecipeThunk(recipeId)),
  getCategories: userId => dispatch(getUserCategoriesThunk(userId)),
  getRecipesInCategory: (userId, categoryId) =>
    dispatch(getRecipesInCategoryThunk(userId, categoryId)),
  submitCategory: (userId, category) =>
    dispatch(submitCategory(userId, category))
})

export default connect(mapState, mapDispatch)(AllRecipes)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100vh;
`
const Title = styled.h1`
  // margin: 20px;
  // text-align: center;
  // font-size: 1.5em;
  font-family: 'Merriweather', serif;
  margin-top: 30px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0px 5px;
    font-size: 1.5em;
    margin-top: ${props => props.height};
  }
`

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 100%;
  padding-top: 20px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 0px;
  }

  .navlink {
    position: absolute;
    top: 250px;
  }
`

const CategoriesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 33.33333%;
  position: relative;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
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
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 50px;
  }
`

const Categories = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
`
