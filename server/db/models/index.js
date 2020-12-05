const User = require('./user')
const Recipe = require('./recipe')
// const { Sequelize } = require('sequelize/types')
const Category = require('./category')
const Sequelize = require('sequelize')
const db = require('../db')

const RecipeCategory = db.define('recipe_categories', {})

// ONE-TO-MANY ASSOCIATION USER TO RECIPES
User.hasMany(Recipe)
Recipe.belongsTo(User, {
  foreignKey: 'userId'
})

// MANY-TO-MANY ASSOCIATION FOR CATEGORIES
Recipe.belongsToMany(Category, {
  through: 'recipe_categories'
})

Category.belongsToMany(Recipe, {
  through: 'recipe_categories'
})

module.exports = {
  User,
  Recipe,
  Category,
  RecipeCategory
}
