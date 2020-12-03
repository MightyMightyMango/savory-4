import axios from 'axios'
// import history from '../history'

const SET_ALL_RECIPES = 'SET_ALL_RECIPES'
const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'

export const setAllRecipes = recipes => ({
  type: SET_ALL_RECIPES,
  recipe: recipes
})

export const setSingleRecipe = recipe => ({
  type: SET_SINGLE_RECIPE,
  recipe: recipe
})

export const setAllRecipesThunk = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/user/${userId}`)
      dispatch(setAllRecipes(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setSingleRecipeThunk = recipeId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/${recipeId}`)
      dispatch(setSingleRecipe(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  allRecipes: [],
  singleRecipe: {}
}

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return {...state, allRecipes: action.recipes}
    case SET_SINGLE_RECIPE:
      return {...state, singleRecipe: action.recipe}
    default:
      return state
  }
}

export default recipesReducer
