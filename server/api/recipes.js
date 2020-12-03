const router = require('express').Router()
const {Recipe} = require('../db/models')
module.exports = router

// Get all recipes in database
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// Get single recipe
router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipes = await Recipe.findAll({
      where: {
        id: recipeId
      }
    })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// Get all recipes for one user
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const recipes = await Recipe.findAll({
      where: {
        userId: userId
      }
    })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})
