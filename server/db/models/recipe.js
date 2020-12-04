const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  publisher: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '/images/default-recipe.png'
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    defaultValue: []
  },
  instructions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    defaultValue: []
  },
  cookTime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  prepTime: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  yield: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  isDraft: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: []
  }
})

module.exports = Recipe
