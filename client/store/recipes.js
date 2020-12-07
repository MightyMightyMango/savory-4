import axios from 'axios'

const SET_ALL_RECIPES = 'SET_ALL_RECIPES'
const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'
const SET_ALL_DRAFTS = 'SET_ALL_DRAFTS'
const DELETE_RECIPE = 'DELETE_RECIPE'
const DELETE_DRAFT = 'DELETE_DRAFT'
const GET_USER_CATEGORIES = 'GET_USER_CATEGORIES'
const GET_RECIPES_IN_CATEGORY = 'GET_RECIPES_IN_CATEGORY'

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

export const deleteRecipe = recipeId => ({
  type: DELETE_RECIPE,
  recipeId
})

export const deleteDraft = recipeId => ({
  type: DELETE_DRAFT,
  recipeId
})

export const getUserCategories = categories => ({
  type: GET_USER_CATEGORIES,
  categories
})

export const getRecipesInCategory = recipes => ({
  type: GET_RECIPES_IN_CATEGORY,
  recipes
})

// ALL RECIPES
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

// SINGLE RECIPE
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

// ALL DRAFTS
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

// DELETE RECIPE
export const deleteRecipeThunk = recipeId => {
  return async dispatch => {
    try {
      dispatch(deleteRecipe(recipeId))
      await axios.delete(`/api/recipes/${recipeId}`)
    } catch (error) {
      console.error(error)
    }
  }
}

// DELETE DRAFT
export const deleteDraftThunk = recipeId => {
  return async dispatch => {
    try {
      dispatch(deleteDraft(recipeId))
      await axios.delete(`/api/recipes/${recipeId}`)
    } catch (error) {
      console.error(error)
    }
  }
}

// USER CATEGORIES
export const getUserCategoriesThunk = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/categories/user/${userId}`)
      dispatch(getUserCategories(res.data.categories))
    } catch (error) {
      console.error(error)
    }
  }
}

// RECIPES IN ONE CATEGORIES FOR ONE USER
export const getRecipesInCategoryThunk = (userId, categoryId) => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `/api/recipes/categories/user/${userId}/category/${categoryId}`
      )
      dispatch(getRecipesInCategory(res.data.recipes))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  allRecipes: [],
  singleRecipe: {},
  allDrafts: [],
  categories: []
}

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_RECIPES:
      return {...state, allRecipes: action.recipes}
    case SET_SINGLE_RECIPE:
      return {...state, singleRecipe: action.recipe}
    case SET_ALL_DRAFTS:
      return {...state, allDrafts: action.recipes}
    case DELETE_RECIPE: {
      const recipes = state.allRecipes.filter(
        recipe => recipe.id !== action.recipeId
      )
      return {...state, allRecipes: recipes}
    }
    case DELETE_DRAFT: {
      const drafts = state.allDrafts.filter(
        draft => draft.id !== action.recipeId
      )
      return {...state, allDrafts: drafts}
    }
    case GET_USER_CATEGORIES:
      return {...state, categories: action.categories}
    case GET_RECIPES_IN_CATEGORY:
      return {...state, allRecipes: action.recipes}
    default:
      return state
  }
}

export default recipesReducer
