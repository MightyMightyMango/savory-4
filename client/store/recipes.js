import axios from 'axios'
// import history from '../history'

const SET_ALL_RECIPES = 'SET_ALL_RECIPES'
const SET_USER_ALL_RECIPES = 'SET_USER_ALL_RECIPES'
const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'

export const setAllRecipes = recipes => ({
  type: SET_ALL_RECIPES,
  recipe: recipes
})

export const setUserAllRecipes = recipes => ({
  type: SET_USER_ALL_RECIPES,
  recipe: recipes
})

export const setSingleRecipes = recipe => ({
  type: SET_SINGLE_RECIPE,
  recipe: recipe
})

export const setAllRecipesThunk = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/`)
      dispatch(setAllRecipesThunk(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setUserAllRecipesThunk = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/user/${userId}`)
      dispatch(setUserAllRecipesThunk(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setSingleRecipeThunk = recipeId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/${recipeId}`)
      dispatch(setSingleRecipeThunk(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return action.recipes
    case SET_USER_ALL_RECIPES:
      return action.recipes
    case SET_SINGLE_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default recipesReducer
