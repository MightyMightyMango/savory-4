import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  getUserCategoriesThunk,
  submitCategory,
  setAllRecipesThunk
} from '../store/recipes'
import EditCategories from './EditCategories'
import HalfPageDiv from '../theme/HalfPageDiv'
import Container from '../theme/Container'
import StyledButton from '../theme/Button'

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
  const [recipesToBeAdded, setRecipesToBeAdded] = useState([])

  useEffect(() => {
    getCategories(user.id)
    getAllRecipes(user.id)
  }, [])

  const handleChange = event => {
    setNewCategory(event.target.value)
  }

  const handleSubmit = event => {
    console.log(recipesToBeAdded)

    submitCat(user.id, newCategory, recipesToBeAdded)
  }

  const onChange = event => {
    setRecipesToBeAdded({
      ...recipesToBeAdded,
      [event.target.id]: event.target.checked
    })
    console.log(event.target.name, event.target.checked, event.target.id)
  }

  console.log(recipesToBeAdded)
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
            <h1>Add Recipe Book</h1>
            <EditCategories
              handleChange={handleChange}
              onChange={onChange}
              handleSubmit={handleSubmit}
              newCategory={newCategory}
              recipes={recipes}
            />
          </>
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
  submitCat: (userId, category, data) => {
    dispatch(submitCategory(userId, category, data))
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
