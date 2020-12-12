const Sequelize = require('sequelize')
const db = require('../db')

const Suggestion = db.define('suggestion', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  recipeUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Suggestion
