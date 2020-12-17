import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  getUserCategoriesThunk,
  submitCategory,
  setAllRecipesThunk,
  updateCategory
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
    recipes,
    updateCat
  } = props
  const [newCategory, setNewCategory] = useState('')
  const [recipesToBeAdded, setRecipesToBeAdded] = useState([])
  const [recipesToBeAdded2, setRecipesToBeAdded2] = useState([])
  const [categorySelected, setCategorySelected] = useState('')

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

  const onClickCategory = name => {
    setCategorySelected(name)
  }

  const onChange2 = event => {
    setRecipesToBeAdded2({
      ...recipesToBeAdded2,
      [event.target.id]: event.target.checked
    })
    console.log('For Update', recipesToBeAdded2)
  }
  const handleSubmit2 = event => {
    console.log(recipesToBeAdded)
    updateCat(user.id, categorySelected, recipesToBeAdded2)
  }

  console.log('For Update', recipesToBeAdded2)
  console.log(categorySelected)
  return (
    <>
      <FadeIn>
        <RecipesContainer>
          <h1>My Books</h1>
          {/* {categories.map(item => <CategoryItem>{item.category}</CategoryItem>)} */}
        </RecipesContainer>
        <ColContainer>
          <Box>
            <>
              <h1>Add a new Category/Book</h1>
              <EditCategories
                add={true}
                handleChange={handleChange}
                onChange={onChange}
                handleSubmit={handleSubmit}
                newCategory={newCategory}
                recipes={recipes}
              />
            </>
          </Box>
          <Box>
            <>
              <h1>Add Recipes to an existing Category/Book</h1>
              <Mapped>
                {categories.map(item => (
                  <CategoryItemLink
                    onClick={() => onClickCategory(item.category)}
                  >
                    {item.category}
                  </CategoryItemLink>
                ))}
              </Mapped>
              <Subtitle>Category Selected: {categorySelected}</Subtitle>
              <EditCategories
                // handleChange={handleChange}
                onChange={onChange2}
                handleSubmit={handleSubmit2}
                // newCategory={newCategory}
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
  },
  updateCat: (userId, category, data) => {
    dispatch(updateCategory(userId, category, data))
  }
})
export default connect(mapState, mapDispatch)(MyBooks)

const Box = styled.div`
  padding: 20px;
  border: 1px solid grey;
  width: 45%;
  font: 0.7em;
  .li {
    display: block;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    border: none;
    padding-bottom: 100px;
  }
`

const ColContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-align: center;
  margin: 100px 0px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
    flex-wrap: wrap;
  }
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

const CategoryItemLink = styled.div`
  font-size: 1em;
  padding: 5px;
  transition-duration: 0.6s;
  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.sage};
    text-decoration: bold;
    cursor: pointer;
  }
`
const Mapped = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Subtitle = styled.div`
  font-size: 1.8em;
  font-family: 'Oswald', sans serif;
  margin 10px 0px;
  color: ${props => props.theme.colors.sage};
`
