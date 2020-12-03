import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// import {connect} from 'react-redux'
// import setUserRecipe from '../store/recipes'

export const SingleRecipe = props => {
  // useEffect(() => {
  //   getUserAllRecipes(props.user.id)
  // })

  console.log('props.match.params.recipeId = ', props.match.params.recipeId)

  const recipe = {
    name: 'Cranberry Sauce with Orange and Cinnamon',
    publisher: 'Bon Appetit',
    url:
      'https://www.bonappetit.com/recipe/cranberry-sauce-with-orange-and-cinnamon',
    imageUrl:
      'https://assets.bonappetit.com/photos/5bc10bdb3f3b4638f1376c88/16:9/w_2560%2Cc_limit/cranberry-sauce-with-orange-and-cinnamon.jpg',
    description:
      'Bright citrus and warming cinnamon are the complements cranberries look for this time of the year. Blanching the chopped orange in boiling water before cooking it with the cranberries removes any bitterness from the peel and pith.',
    ingredients: [
      '1 medium navel orange, seeds removed, chopped',
      '1 lb. fresh (or frozen) cranberries',
      '1 cup sugar',
      '2 Tbsp. unsalted butter',
      '1 3"-long cinnamon stick”,”½ tsp. ground allspice',
      'Pinch of kosher salt'
    ],
    instructions: [
      'Place orange in a large saucepan and pour in cold water to come 1 up sides of pan. Bring to a boil, then remove immediately from heat and drain orange in a mesh sieve or colander. Rinse under cold water; return to saucepan. Add cranberries, sugar, butter, cinnamon, allspice, and salt and bring to a boil, stirring to dissolve sugar.',
      'Cook, stirring often and reducing heat as needed to avoid scorching, until cranberries burst, juices are syrupy, and pan is visible when a wooden spoon is dragged across the bottom, 12–15 minutes. Let cool.',
      'Do Ahead: Sauce can be made 1 week ahead. Cover and chill.'
    ]
  }

  return (
    <>
      <Container>
        <Title>{recipe.name}</Title>
        <RecipeContainer>
          <Image src={recipe.imageUrl} />
          <Details>
            <div>{recipe.description}</div>
            <div>Source: {recipe.publisher}</div>
            <div>Link: {recipe.url}</div>
            <div>Prep Time: {recipe.prepTime}</div>
            <div>Cook Time: {recipe.cookTime}</div>
            <div>Yield: {recipe.yield}</div>
            <div>Categories: {recipe.categories}</div>
          </Details>

          <Ingredients>
            <Subtitle>Ingredients</Subtitle>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <ListItem key={recipe.ingredients.indexOf(ingredient)}>
                  {ingredient}
                </ListItem>
              ))}
            </ul>
          </Ingredients>
          <Instructions>
            <Subtitle>Instructions</Subtitle>
            <ul>
              {recipe.instructions.map(instruction => (
                <ListItem key={recipe.instructions.indexOf(instruction)}>
                  Step 1: {instruction}
                </ListItem>
              ))}
            </ul>
          </Instructions>
        </RecipeContainer>
      </Container>
    </>
  )
}

// const mapState = state => ({
//   recipe: singleRecipe
// })

// const mapDispatch = dispatch => ({
//   getRecipe: recipeId => dispatch(setUserRecipe(recipeId))
// })

export default SingleRecipe

const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
`
const Title = styled.div`
  margin: 20px;
  text-align: center;
  font-size: 1.5em;
  width: 100%;
`

const Image = styled.img`
  width: 30%;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
  padding-bottom: 20px;
`

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: center;
  width: 70%;
  padding-top: 20px;
`

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  padding-left: 20px;
`

const Subtitle = styled.div`
  font-size: 1em;
  padding-bottom: 5px;
`

const ListItem = styled.li`
  list-style-type: none;
`

const Ingredients = styled.div`
  width: calc(30%-20px);
  padding: 20px;
`

const Instructions = styled.div`
  width: calc(70%-20px);
  padding: 20px;
`
