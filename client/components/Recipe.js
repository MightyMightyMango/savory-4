import React from 'react' 
import {connect} from 'react-redux'
import {setRecipeThunk} from '../store/singleRecipe'
import history from '../history'

export const Recipe = props => {
  
  const {getSingleRecipe} = props
  let userId = 0

  const submitUrl = event => {
    event.preventDefault()
    const url = document.getElementById('url-input').value
    getSingleRecipe(url, userId)
    document.getElementById('url-input').value = ' '  
    history.push('/recipeform')
    console.log("history", history)
  }

  return (
    <>
      <div className="title">Fetch Recipe here</div>
      <form>
        <input type="text" id="url-input" />
        <button type="submit" onClick={() => submitUrl(event)}>
          Get Recipe
        </button>
      </form>
    </>
  )
}

const mapState = state => ({
  recipe: state.recipe
})

const mapDispatch = dispatch => ({
  getSingleRecipe: (url, userId) => {
    dispatch(setRecipeThunk(url, userId))
  }
})

export default connect(mapState, mapDispatch)(Recipe)
