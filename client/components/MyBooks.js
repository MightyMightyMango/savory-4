import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  getUserCategoriesThunk,
  submitCategory,
  setAllRecipesThunk
} from '../store/recipes'
import EditCategories from './EditCategories'
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

  return (
    <>
      <FadeIn>
        <Container>
          <RecipesContainer>
            <h1>My Books Test I've changed the title</h1>
            {categories.map(item => (
              <CategoryItem key={item.id}>
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
              </CategoryItem>
            ))}
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
        </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ColContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  text-align: center;
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
