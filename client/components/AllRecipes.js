import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  setAllRecipesThunk,
  deleteRecipeThunk,
  getUserCategoriesThunk,
  getRecipesInCategoryThunk
} from '../store/recipes'
import {NavLink} from 'react-router-dom'

export const AllRecipes = props => {
  // categories contains all the categories
  // to filter by category, pass the userId and categoryId into getRecipesInCategory
  const {
    user,
    recipes,
    categories,
    getAllRecipes,
    deleteRecipe,
    getCategories,
    getRecipesInCategory,
    recipesByCat
  } = props

  useEffect(() => {
    getAllRecipes(props.user.id)
    getCategories(props.user.id)
    // getRecipesInCategory(props.user.id, 2)
  }, [])

  //map categories

  const handleDeleteRecipe = (event, recipeId) => {
    event.preventDefault()
    console.log('event ', event)
    deleteRecipe(recipeId)
  }

  let fetchedRecipes = recipes || []

  const getRecipesFromCategory = event => {
    event.preventDefault()
    console.log('recipes by Category')
    getRecipesInCategory(props.user.id, event.target.value)
    //  categories.map(category => {
    //    <Subtitle></Subtitle>
    //  })
  }

  //  async function getRecipesFromCategory(category) {
  //     console.log("recipes by Category", recipesByCat.recipes)
  //     await getRecipesInCategory(props.user.id, 2)
  //     return <div>{category}</div>
  //   }

  return (
    <>
      <Container>
        {/* <Title>My Recipe Books</Title> */}
        {/* {getRecipesFromCategory} */}
        <Title>My Recipes</Title>
        <RecipesContainer>
          {Array.isArray(recipes) ? (
            recipes.map(recipe => (
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
            ))
          ) : (
            <div />
          )}
        </RecipesContainer>
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
    dispatch(getRecipesInCategoryThunk(userId, categoryId))
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
