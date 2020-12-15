const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  colorCSS: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'linear-gradient(to bottom, rgb(131, 178, 226), rgb(91,124,158))'
  }
})

module.exports = Category
