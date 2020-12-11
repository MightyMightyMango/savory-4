import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  getUserCategoriesThunk,
  submitCategory,
  setAllRecipesThunk
} from '../store/recipes'
import HalfPageDiv from '../theme/HalfPageDiv'
import Container from '../theme/Container'
import EditCategories from './EditCategories'

import FadeIn from 'react-fade-in'

const MyBooks = props => {
  const {
    categories,
    getCategories,
    getAllRecipes,
    submitCat,
    user,
    recipes
  } = props
  const [newCategory, setNewCategory] = useState('')
  const [recipesToBeAdded, setRecipesToBeAdded] = useState({})

  useEffect(() => {
    getCategories(user.id)
    getAllRecipes(user.id)
  }, [])

  const handleChange = event => {
    setNewCategory(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(newCategory)
    submitCat(user.id, newCategory, recipesToBeAdded)
  }

  const handleAddChange = event => {
    console.log(event.target.name, event.target.value)
    setRecipesToBeAdded(...state, {[event.target.name]: event.target.value})
    console.log(recipesToBeAdded)
  }

  return (
    <>
      <FadeIn>
        <RecipesContainer>
          <h1>My Books</h1>
          {categories.map(item => <CategoryItem>{item.category}</CategoryItem>)}
        </RecipesContainer>
        <ColContainer>
          <Box>
            <>
              <h1>Add Recipe</h1>
              <EditCategories
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                newCategory={newCategory}
              />
              <form onSubmit={props.handleAddSubmit}>
                {recipes.map(item => (
                  <div className="li">
                    <input
                      type="checkbox"
                      name={item.name}
                      value="checked"
                      onChange={handleAddChange}
                    />
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                ))}
                <button type="submit">Add Recipes to your book</button>
              </form>
            </>
          </Box>
          <Box>
            <h1>Edit Recipes</h1>
          </Box>
        </ColContainer>
      </FadeIn>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  categories: state.recipes.categories,
  recipes: state.recipes.allRecipes
})

const mapDispatch = dispatch => ({
  getAllRecipes: userId => dispatch(setAllRecipesThunk(userId)),
  getCategories: userId => dispatch(getUserCategoriesThunk(userId)),
  submitCat: (userId, category) => {
    dispatch(submitCategory(userId, category))
  }
})
export default connect(mapState, mapDispatch)(MyBooks)

const Box = styled.div`
  padding: 100px;
  .li {
    display: block;
  }
`

const ColContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
`

const RecipesContainer = styled.div`
  justify-content: center;
  text-align: center;
  width: 100%;
  padding-top: 20px;
`
const CategoryItem = styled.div`
  font-size: 1em;
  padding: 5px;
`
