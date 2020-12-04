import axios from 'axios'
import history from '../history'

const SET_SINGLE_RECIPE = 'SET_SINGLE_RECIPE'
const PASS_RECIPE = 'PASS_RECIPE'

export const setSingleRecipe = recipe => ({
  type: SET_SINGLE_RECIPE,
  recipe
})

export const passRecipe = recipe => ({
  type: PASS_RECIPE,
  recipe
})

/* WITH DISPATCH*/
// export const setRecipeThunk = (url, userId) => {
//   return async dispatch => {
//     try {
//       console.log('url in thunk', url)
//       const res = await axios.post('/api/scrape/', {
//         url: url,
//         userId: userId
//       })
//       console.log('Thunk: res.data', res.data)
//       let jsonData = JSON.stringify(res.data)
//       localStorage.setItem(`recipeDraft`, jsonData)
//       console.log('Thunk JSON data = ', jsonData)
//       dispatch(setSingleRecipe(res.data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

/* WITHOUT DISPATCH*/
export const setRecipeThunk = async (url, userId) => {
  try {
    console.log('url in thunk', url)
    const res = await axios.post('/api/scrape/', {
      url: url,
      userId: userId
    })
    console.log('Thunk: res.data', res.data)
    localStorage.clear()
    console.log('Thunk: cleared')
    let jsonData = JSON.stringify(res.data)
    localStorage.setItem('recipeDraft', jsonData)
  } catch (error) {
    console.error(error)
  }
}

// export const passRecipeThunk = async (recipe) => {
//   return async dispatch => {
//     dispatch(passRecipe(recipe))
//   }
// }

const initialState = {}

function singleRecipeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_RECIPE:
      return {...state, recipe: action.recipe}
    case PASS_RECIPE:
      return action.recipe
    default:
      return state
  }
}

export default singleRecipeReducer
