import axios from 'axios'
// import history from '../history'

const SET_ALL_RECIPES = 'SET_ALL_RECIPES'
const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'
const SET_ALL_DRAFTS = 'SET_ALL_DRAFTS'

export const setAllRecipes = recipes => ({
  type: SET_ALL_RECIPES,
  recipes
})

export const setAllDrafts = recipes => ({
  type: SET_ALL_DRAFTS,
  recipes
})

export const setSingleRecipe = recipe => ({
  type: SET_SINGLE_RECIPE,
  recipe
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
      console.log('In Single Recipes Thunk = ', res.data)
      dispatch(setSingleRecipe(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setAllDraftsThunk = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/drafts/${userId}`)
      dispatch(setAllDrafts(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  allRecipes: [],
  singleRecipe: {}
}

// const initialState = []

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return {...state, allRecipes: action.recipes}
    case SET_SINGLE_RECIPE:
      return {...state, singleRecipe: action.recipe}
    case SET_ALL_DRAFTS:
      return {...state, allDrafts: action.recipes}
    default:
      return state
  }
}

export default recipesReducer
