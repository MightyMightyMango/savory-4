import React, {useEffect} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {setAllRecipesThunk} from '../store/recipes'
import {NavLink} from 'react-router-dom'

export const AllRecipes = props => {
  // const {state, setState} = useState(props)

  const {recipes, getAllRecipes} = props

  console.log('props ', props)
  console.log('recipes ', recipes)

  // const [initialRecipeState, setRecipe] = useState('')

  // console.log('1. initialRecipeState ', initialRecipeState)

  useEffect(() => {
    getAllRecipes(props.user.id)

    console.log('In useEffect props ', props)
    // console.log('2. initialRecipeState ', initialRecipeState)
  }, [])

  // console.log('props.user.recipes ', props.user.recipes)

  // const recipes = props

  // console.log('In AllRecipes recipes ', props.recipes)

  // if (recipes.length > 0) {
  //   return (
  //     <>
  //       <Container>
  //         <Title>My Recipes</Title>
  //         <RecipesContainer>
  //           {recipes.map(recipe => (
  //             <Recipe key={recipe.id}>
  //               <Image src={recipe.imageUrl} />
  //               <Subtitle>{recipe.name}</Subtitle>
  //               <Subtitle>Source: {recipe.publisher}</Subtitle>
  //               <NavLink to={`/recipes/${recipe.id}`}>
  //                 <button type="submit">View Recipe</button>
  //               </NavLink>
  //             </Recipe>
  //           ))}
  //         </RecipesContainer>
  //       </Container>
  //     </>
  //   )

  // } else {
  //   return (
  //     <>
  //       <Container>
  //         <Title>Rendering</Title>
  //       </Container>
  //     </>
  //   )

  // }

  return (
    <>
      <Container>
        <Title>My Recipes</Title>
        <RecipesContainer>
          {recipes.map(recipe => (
            <Recipe key={recipe.id}>
              <Image src={recipe.imageUrl} />
              <Subtitle>{recipe.name}</Subtitle>
              <Subtitle>Source: {recipe.publisher}</Subtitle>
              <NavLink to={`/recipes/${recipe.id}`}>
                <button type="submit">View Recipe</button>
              </NavLink>
            </Recipe>
          ))}
        </RecipesContainer>
      </Container>
    </>
  )
}

const mapState = state => ({
  user: state.user,
  recipes: state.recipes.allRecipes
})

const mapDispatch = dispatch => ({
  getAllRecipes: userId => dispatch(setAllRecipesThunk(userId))
})

export default connect(mapState, mapDispatch)(AllRecipes)

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
