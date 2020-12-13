const router = require('express').Router()
const {User, Recipe, Suggestion} = require('../db/models')
const isAdmin = require('../auth/helper')
module.exports = router

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

// PUT /api/users
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

// POST /api/users/suggestions
router.post('/suggestions', async (req, res, next) => {
  try {
    const suggestion = req.body
    const created = await Suggestion.create(suggestion)
    res.json(created)
  } catch (error) {
    console.error(error)
    //next (error)
  }
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
