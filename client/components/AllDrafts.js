import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setAllDraftsThunk} from '../store/recipes'
import {NavLink} from 'react-router-dom'

export const AllDrafts = props => {
  // const {state, setState} = useState(props)

  const {recipes, getDrafts} = props

  console.log('props ', props)
  console.log('recipes ', recipes)

  useEffect(() => {
    getDrafts(props.user.id)

    console.log('In useEffect props ', props)
  })

  return (
    <>
      <Container>
        <Title>My Recipe Drafts</Title>
        <RecipesContainer>
          {recipes
            ? recipes.map(recipe => (
                <Recipe key={recipe.id}>
                  <Image src={recipe.imageUrl} />
                  <Subtitle>{recipe.name}</Subtitle>
                  <Subtitle>Source: {recipe.publisher}</Subtitle>
                  <NavLink to={`/recipes/${recipe.id}`}>
                    <button type="submit">View Recipe</button>
                  </NavLink>
                </Recipe>
              ))
            : ''}
        </RecipesContainer>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes.allDrafts
})

const mapDispatch = dispatch => ({
  getDrafts: userId => dispatch(setAllDraftsThunk(userId))
})

export default connect(mapState, mapDispatch)(AllDrafts)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 87vh;
`
const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
`

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 70%;
  padding-top: 20px;
`

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-contents: flex-start;
  padding: 30px;
  width: calc(33.333333% - 30px);
`

const Subtitle = styled.div`
  font-size: 1em;
  padding-bottom: 5px;
`

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
  padding-bottom: 20px;
`
