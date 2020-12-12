const router = require('express').Router()
const {User, Recipe, Suggestion} = require('../db/models')
module.exports = router

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

router.post('/suggestions', async (req, res, next) => {
  try {
    const suggestion = req.body
    const created = await Suggestion.create({
      name: suggestion.name,
      url: suggestion.url,
      recipeUrl: suggestion.recipeUrl
    })
    console.log('suggestion post res ', res)
    console.log('suggestion post res.data ', res)
    res.json(created)
  } catch (error) {
    console.error(error)
    //next (error)
  }
})

router.get('/suggestions', async (req, res, next) => {
  try {
    // const suggestion = req.body
    const res = await Suggestion.findAll()
    console.log('suggestion post res ', res)
    console.log('suggestion post res.data ', res)
    res.status(200).send(res)
  } catch (error) {
    console.error(error)
    //next (error)
  }
})
