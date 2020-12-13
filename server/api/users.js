const router = require('express').Router()
const {User, Recipe, Suggestion} = require('../db/models')
const isAdmin = require('../auth/helper')
module.exports = router

// Get all users
// Only an admin can access this route
// GET /api/users
router.get('/', async (req, res, next) => {
  if (req.user === undefined) {
    res.sendStatus(404)
  }
  const returned = await isAdmin(req.user.dataValues.id)
  try {
    if (returned) {
      const users = await User.findAll({
        attributes: ['id', 'email'],
        include: Recipe
      })
      res.json(users)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// Edit a user
// Verifies that the request is coming from the user or that the user is an admin
// PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  // if (req.user === undefined) {
  //   res.sendStatus(404)
  // }
  // const returned = await isAdmin(req.user.dataValues.id)
  // if (returned || req.params.userId === req.user.dataValues.id) {
  try {
    const user = await User.findByPk(req.params.userId)
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
  // } else {
  //   res.sendStatus(404)
  // }

  // Comment this in to test
  // try {
  //   const user = await User.findByPk(req.params.userId)
  //   const updatedUser = await user.update(req.body)
  //   res.json(updatedUser)
  // } catch (err) {
  //   next(err)
  // }
})

// Submit a suggestion
// Only an admin or user associated with the recipe can access this route
// POST /api/users/suggestions
router.post('/suggestions', async (req, res, next) => {
  // if (req.user === undefined) {
  //   res.sendStatus(404)
  // }
  // const returned = await isAdmin(req.user.dataValues.id)
  // console.log('req.user.dataValues.id ', req.user.dataValues.id)
  // if (returned || req.params.userId === req.user.dataValues.id) {
  try {
    const suggestion = req.body
    const created = await Suggestion.create(suggestion)
    res.json(created)
  } catch (error) {
    next(error)
  }
  // } else {
  //   res.sendStatus(404)
  // }

  // Comment this in to test
  // try {
  //   const suggestion = req.body
  //   const created = await Suggestion.create(suggestion)
  //   res.json(created)
  // } catch (error) {
  //   next (error)
  // }
})

// written for the future, admins can pull all the suggestions for their ccount
// GET // /api/users/suggestions
router.get('/suggestions', async (req, res, next) => {
  if (req.user === undefined) {
    res.sendStatus(404)
  }
  const returned = await isAdmin(req.user.dataValues.id)
  try {
    if (returned) {
      const suggestions = await Suggestion.findAll()
      res.json(suggestions)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
