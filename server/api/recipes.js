const router = require('express').Router()
const {Recipe, Category, RecipeCategory, User} = require('../db/models')
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

// Delete a single recipe. Also use this route for deleting drafts.
// DELETE /api/recipes/:recipeId
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

// Get recipe draft
// GET /api/recipes/draft/:userId
router.get('/draft/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const recipe = await Recipe.findAll({
      where: {
        userId: userId,
        isDraft: true
      },
      order: [['updatedAt', 'DESC']]
    })
    let draft = recipe[0]
    res.json(draft)
  } catch (err) {
    next(err)
  }
})

// Get all drafts for one user
// GET /api/recipes/drafts/:userId
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

// Get all recipes for one category
// GET /api/recipes/categories/:categoryId
router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const recipesInCategory = await Category.findAll({
      where: {
        id: categoryId
      },
      include: {
        model: Recipe
      }
    })
    res.json(recipesInCategory)
  } catch (err) {
    next(err)
  }
})

// Get all recipes for one category
// GET /api/recipes/categories/:userId
router.get('/categories/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    console.log('categoryId', userId)
    console.log('typeof categoryId', typeof userId)
    const recipesInCategory = await User.findOne({
      where: {
        id: userId
      },
      include: {
        model: Category
      }
    })
    res.json(recipesInCategory)
  } catch (err) {
    next(err)
  }
})
