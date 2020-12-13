import axios from 'axios'

// import history from '../history'

const SET_A_SINGLE_RECIPE = 'SET_A_SINGLE_RECIPE'

export const setASingleRecipe = recipe => ({
  type: SET_A_SINGLE_RECIPE,
  recipe: recipe
})

//RESET RECIPE STATE
export const resetRecipeState = () => {
  return dispatch => {
    try {
      dispatch(setASingleRecipe({}))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setRecipeDraft = (url, userId) => {
  return async dispatch => {
    try {
      // console.log('userid in route', userId)
      const res = await axios.post('/api/scrape/', {
        url: url,
        userId: userId
      })
      dispatch(setASingleRecipe(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getUserDraft = userId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/draft/${userId}`)
      // console.log('res.data in draft thunk', res.data)
      dispatch(setASingleRecipe(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitRecipe = recipe => {
  return async dispatch => {
    try {
      let recipeId = recipe.id
      const res = await axios.put(`/api/recipes/${recipeId}`, recipe)
      // console.log(res.data)
      // dispatch(setASingleRecipe(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {}

function singleRecipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_A_SINGLE_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default singleRecipeReducer
