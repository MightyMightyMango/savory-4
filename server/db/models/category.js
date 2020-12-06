const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  }
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // },
  // recipeId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   defaultValue: 0
  // }
})

module.exports = Category
