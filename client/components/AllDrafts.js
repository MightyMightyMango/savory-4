import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setAllDraftsThunk, deleteDraftThunk} from '../store/recipes'
import {NavLink} from 'react-router-dom'
import Button from '../theme/Button'

import FadeIn from 'react-fade-in'

export const AllDrafts = props => {
  // const {state, setState} = useState(props)

  const {recipes, getDrafts, deleteDraft} = props

  console.log('props ', props)
  console.log('recipes ', recipes)

  useEffect(() => {
    getDrafts(props.user.id)

    console.log('In useEffect props ', props)
  }, [])

  const handleDeleteDraft = (event, recipeId) => {
    event.preventDefault()
    deleteDraft(recipeId)
    history.push('/drafts')
  }

  return (
    <>
      <Container>
        <FadeIn>
          <Title height="70px">My Recipe Drafts</Title>
          <RecipesContainer>
            {recipes
              ? recipes.map(recipe => (
                  <Recipe key={recipe.id}>
                    <Image src={recipe.imageUrl} />
                    <Title>{recipe.name}</Title>
                    {/* <Subtitle>Source: {recipe.publisher}</Subtitle> */}
                    <NavLink className="navlink" to={`/recipes/${recipe.id}`}>
                      <Button primary>View Recipe</Button>
                    </NavLink>
                    {/* <button
                    type="submit"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you wish to delete this draft?'
                        )
                      )
                        handleDeleteDraft(event, recipe.id)
                    }}
                  >
                    Delete Draft
                  </button> */}
                  </Recipe>
                ))
              : ''}
          </RecipesContainer>
        </FadeIn>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes.allDrafts
})

const mapDispatch = dispatch => ({
  getDrafts: userId => dispatch(setAllDraftsThunk(userId)),
  deleteDraft: recipeId => dispatch(deleteDraftThunk(recipeId))
})

export default connect(mapState, mapDispatch)(AllDrafts)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-bottom: 70px;
`
const Title = styled.h1`
  // margin: 20px;
  // text-align: center;
  font-size: 1.7em;
  margin-top: 30px;
  font-family: 'Merriweather', serif;
  padding: 5px;
  padding-bottom: 20px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 0px 5px;
    font-size: 1.5em;
    margin-top: ${props => props.height};
  }
`

const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 100%;
  padding-top: 20px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-top: 0px;
  }

  .navlink {
    position: absolute;
    top: 250px;
  }
`

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-contents: flex-start;
  align-items: center;
  width: 33.33333%;
  position: relative;
  width: 33.33333%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
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
