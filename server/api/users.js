const router = require('express').Router()
const {User, Recipe} = require('../db/models')
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
