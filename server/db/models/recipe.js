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
  thumbnailUrl: {
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
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  prepTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  yield: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: []
  }
})

module.exports = Recipe
