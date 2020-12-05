const router = require('express').Router()
const {Recipe} = require('../db/models')
module.exports = router

// Get all recipes in database
// GET /api/recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// Get single recipe
// GET /api/recipes/:recipeId
router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.findByPk(recipeId)
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

// Edit a single recipe
// PUT /api/recipes/:recipeId
router.put('/:recipeId', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.findByPk(recipeId)
    const newRecipe = await recipe.update(req.body)
    res.status(200).send(newRecipe)
  } catch (err) {
    next(err)
  }
})

// Delete a single recipe
router.delete('/:recipeId', async (req, res, next) => {
  try {
    const id = req.params.recipeId
    await Recipe.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// Get all recipes for one user
// GET /api/recipes/user/:userId
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

router.get('/drafts/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const drafts = await Recipe.findAll({
      where: {
        userId: userId,
        isDraft: true
      }
    })
    res.json(drafts)
  } catch (err) {
    next(err)
  }
})
