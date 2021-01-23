import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  setAllRecipesThunk,
  deleteRecipeThunk,
  getUserCategoriesThunk,
  getRecipesInCategoryThunk,
  submitCategory,
  setAllFinalRecipesThunk,
  filterRecipes
} from '../store/recipes'
import {NavLink} from 'react-router-dom'
// import EditCategories from './EditCategories'
import Button from '../theme/Button'
import {StyledButton} from '../theme/Button.js'
import Link from 'react-router-dom'
import Search from './Search'

import FadeIn from 'react-fade-in'
import {use} from 'chai'
import {filter} from 'compression'

export const AllRecipes = props => {
  // categories contains all the categories
  // to filter by category, pass the userId and categoryId into getRecipesInCategory
  const [showForm, toggleShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [sortedByParams, setSorted] = useState([])
  const [searchFieldValue, setSearchValue] = useState('')

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
    deleteRecipe(recipeId)
  }

  const getRecipesFromCategory = event => {
    event.preventDefault()
    getRecipesInCategory(user.id, event.target.value)
  }

  const handleSort = value => {
    if (sortedByParams.length === 0) {
      // if the sort parameters have not been set
      const sorted = []
      recipes.forEach(recipe => {
        // split name into an array
        const recipeName = recipe.name.split(' ')
        recipeName.forEach(word => {
          if (
            !['the', 'an', 'a', 'with', 'is', 'of', 'on', 'and'].includes(
              word.toLowerCase()
            )
          ) {
            sorted.push({keyword: word.toLowerCase(), recipeId: recipe.id})
          }
        })
      })
      setSorted(sorted)
    }

    console.log('in handleSort')
    filterRecipes(value, sortedByParams)
  }

  return (
    <>
      <Container>
        <FadeIn>
          <Title height="70px">My Recipes</Title>
          <Search handleSort={handleSort} />
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
                </Recipe>
              ))
            ) : (
              <div />
            )}
          </RecipesContainer>
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
  getAllRecipes: userId => dispatch(setAllFinalRecipesThunk(userId)),
  deleteRecipe: recipeId => dispatch(deleteRecipeThunk(recipeId)),
  filterRecipes: (filterBy, currentRecipes, sortedByParams) => {
    dispatch(filterRecipes(filterBy, currentRecipes, sortedByParams))
  },
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
  margin-bottom: 70px;
`
const Title = styled.h1`
  // margin: 20px;
  // text-align: center;
  font-size: 1.7em;
  font-family: 'Merriweather', serif;
  margin-top: 30px;
  padding: 5px;
  padding-bottom: 20px;
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
    margin-top: 50px;100
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
