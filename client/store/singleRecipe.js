import axios from 'axios'
import history from '../history'

const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'

export const setSingleRecipe = recipe => ({
  type: SET_SINGLE_RECIPE,
  recipe: recipe
})

export const setRecipeThunk = (url, userId) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/scrape/', {
        url: url,
        userId: userId
      })
      dispatch(setSingleRecipe(res.data))
      history.push('/recipeform')
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

function singleRecipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default singleRecipeReducer
