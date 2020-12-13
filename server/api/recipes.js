const router = require('express').Router()
const {
  Recipe,
  Category,
  RecipeCategory,
  User,
  UserCategory
} = require('../db/models')
const isAdmin = require('../auth/helper')

module.exports = router

// Get all recipes in database
// Verifies that the request is coming from an admin
// GET /api/recipes
router.get('/', async (req, res, next) => {
  if (req.user === undefined) {
    res.sendStatus(404)
  }
  const returned = await isAdmin(req.user.dataValues.id)
  try {
    if (returned) {
      const recipes = await Recipe.findAll()
      res.json(recipes)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// Get single recipe
// Verifies that the request is coming from the user or that the user is an admin
// GET /api/recipes/:recipeId
router.get('/:recipeId', async (req, res, next) => {
  if (req.user === undefined) {
    res.sendStatus(404)
  }
  const returned = await isAdmin(req.user.dataValues.id)
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.findByPk(recipeId)
    if (returned || req.user.dataValues.id === recipe.userId) {
      res.json(recipe)
    } else {
      res.sendStatus(404)
    }
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
    console.log('OLD recipe', recipe)
    const newRecipe = await recipe.update(req.body)
    console.log('newRecipe', newRecipe)
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
  if (req.user === undefined) {
    res.sendStatus(404)
  }

  const returned = await isAdmin(req.user.dataValues.id)

  try {
    if (returned || req.user.dataValues.id === req.params.userId) {
      const recipes = await Recipe.findAll({
        where: {
          userId: req.params.userId
        }
      })
      res.json(recipes)
    } else {
      res.sendStatus(404)
    }
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

// PUT   /api/recipes/categories/:userId
router.put('/categories/user/:userId', async (req, res, next) => {
  try {
    const category = req.body.category
    const userId = req.params.userId
    const data = req.body.recipes

    //const categoryId = req.body.categoryId
    const recipeId = req.body.recipeId
    console.log('Data in route', data)
    const newCategory = await Category.findOrCreate({
      where: {
        category: category
      }
    })
    await UserCategory.create({
      userId: userId,
      categoryId: newCategory[0].id
    })

    //NEED TO FIGURE THIS OUT
    // await data.forEach(item=> {
    //  RecipeCategory.create({
    //     recipeId: item,
    //     categoryId: newCategory[0].id
    // });
    // })
    for (const [key, value] of Object.entries(data)) {
      if (value === true) {
        console.log('key', key)
        await RecipeCategory.create({
          recipeId: key,
          categoryId: newCategory[0].id
        })
      }
    }

    res.status(200).send(newCategory[0])
  } catch (error) {
    next(error)
  }
})

// Get all categories for one user
// GET /api/recipes/categories/user/:userId
router.get('/categories/user/:userId/', async (req, res, next) => {
  try {
    const userId = req.params.userId
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

// GET /api/recipes/categories/user/:userId
router.get(
  '/categories/user/:userId/category/:categoryId',
  async (req, res, next) => {
    try {
      const userId = req.params.userId
      const categoryId = req.params.categoryId
      const recipesInCategory = await Category.findOne({
        where: {
          id: categoryId
        },
        include: {
          model: Recipe,
          where: {
            userId: userId
          }
        }
      })
      res.json(recipesInCategory)
    } catch (err) {
      next(err)
    }
  }
)

// Get all categories for one user
// GET /api/recipes/categories/user/:userId
router.get('/categories/user/:userId/', async (req, res, next) => {
  try {
    const userId = req.params.userId
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

// UPDATE CATEGORY NAME
router.put('/categories/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const foundCategory = await Category.findOne({
      where: {
        id: categoryId
      }
    })
    let updatedCategory = await foundCategory.update(req.body)

    res.json(updatedCategory)
  } catch (error) {
    next(error)
  }
})
