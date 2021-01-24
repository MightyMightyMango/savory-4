import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  getUserCategoriesThunk,
  submitCategory,
  setAllRecipesThunk,
  updateCategory,
  getRecipesInCategoryThunk
} from '../store/recipes'
import EditCategories from './EditCategories'
import {Link} from 'react-router-dom'

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

  // BOOKS BACKGROUND

  const setBackgroundColor = () => {
    const colors = [
      'linear-gradient(to bottom, rgb(131, 178, 226), rgb(91,124,158))',
      'linear-gradient(to bottom, rgb(229,161,54), rgb(183,128,43))',
      'linear-gradient(to bottom, rgb(164,84,80), rgb(131,67,64))',
      'linear-gradient(to bottom, rgb(68,122,106), rgb(47,85,74))',
      'linear-gradient(to bottom, rgb(154,142,179), rgb(123,113,143))',
      'linear-gradient(to bottom, rgb(70,130,180), rgb(49,91,125))'
    ]
    return colors[Math.floor(Math.random() * Math.floor(6))]
  }

  const handleSubmit = event => {
    event.preventDefault()
    const color = setBackgroundColor()
    submitCat(user.id, newCategory, recipesToBeAdded, color)
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

  const showRecipesInBook = categoryId => {
    console.log('categoryId is ', categoryId)
    getRecipesInCategoryThunk(user.id, categoryId)
    console.log('showRecipes props ', props)
    props.history.push('/books')
    console.log('showRecipes 2 props ', props)
  }

  return (
    <>
      <FadeIn>
        <RecipesContainer>
          <h1>My Books</h1>
          {categories.map(item => (
            <CategoryItem key={item.id}>
              <Link
                to={{
                  pathname: '/myrecipes',
                  categoryId: item.id
                }}
              >
                <Book
                  style={{
                    background: item.colorCSS
                  }}
                >
                  <Band1 className="content" />
                  <Band2 className="content" />
                  <BookTitle className="content">{item.category}</BookTitle>
                  <Band3 className="content" />
                  <Band4 className="content" />
                </Book>
              </Link>
            </CategoryItem>
          ))}
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
  submitCat: (userId, category, data, colorCSS) => {
    dispatch(submitCategory(userId, category, data, colorCSS))
  },
  updateCat: (userId, category, data) => {
    dispatch(updateCategory(userId, category, data))
  },
  getRecipesInCategory: (userId, categoryId) =>
    dispatch(getRecipesInCategoryThunk(userId, categoryId))
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`
const CategoryItem = styled.div`
  // font-size: 1em;
  // padding: 5px;
`

const Book = styled.div`
  overflow: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Homemade Apple', cursive;
  color: white;
  border-radius: 5px;
  font-size: 20px;
  background: ${props => props.background};
  padding-left: 60px;
  padding-right: 60px;
  margin-left: 10px;
  margin-right: 10px;
  border: none;
  transition-duration: 0.4s;
  z-index: 1;

  &:hover {
    transform: translateX(-20px);
    transition-duration: 0.4s;
    // -moz-transform : translate(50%, 10%) rotate(20deg) scale(0.75);
    // -o-transform : translate(50%, 10%) rotate(20deg) scale(0.75);
    // -webkit-transform : translate(50%, 10%) rotate(20deg) scale(0.75);
    // transform : translate(50%, 10%) rotate(20deg) scale(0.75);
    // border: 5px solid black;
  }
  .content {
    display: inline-block;
  }
`
const Band1 = styled.div`
  width: 10px;
  min-height: 84px;
  background: linear-gradient(to bottom, rgb(255, 215, 0), rgb(229, 193, 0));
  bottom: 0px;
`

const Band2 = styled.div`
  width: 10px;
  min-height: 84px;
  background: linear-gradient(to bottom, rgb(255, 215, 0), rgb(229, 193, 0));
  margin-left: 20px;
  bottom: 0px;
`

const BookTitle = styled.div`
  padding-left: 80px;
  padding-right: 80px;
`

const Band3 = styled.div`
  width: 10px;
  min-height: 84px;
  background: linear-gradient(to bottom, rgb(255, 215, 0), rgb(229, 193, 0));
  margin-right: 20px;
  bottom: 0px;
`

const Band4 = styled.div`
  width: 10px;
  min-height: 84px;
  background: linear-gradient(to bottom, rgb(255, 215, 0), rgb(229, 193, 0));
  bottom: 0px;
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
