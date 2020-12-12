const router = require('express').Router()
const {User, Recipe, Suggestion} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
      include: Recipe
    })
    res.json(users)
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
  try {
    // const suggestion = req.body
    const suggestions = await Suggestion.findAll()
    res.json(suggestions)
  } catch (error) {
    console.error(error)
    //next (error)
  }
})
