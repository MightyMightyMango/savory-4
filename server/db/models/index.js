const User = require('./user')
const Recipe = require('./recipe')
const Category = require('./category')
const Suggestion = require('./suggestion')
const Sequelize = require('sequelize')
const db = require('../db')

const RecipeCategory = db.define('recipe_categories', {})
const UserCategory = db.define('user_categories', {})

// ONE-TO-MANY ASSOCIATION USER TO RECIPES
User.hasMany(Recipe)
Recipe.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Suggestion)
Suggestion.belongsTo(User, {
  foreignKey: 'userId'
})

// MANY-TO-MANY ASSOCIATION FOR CATEGORIES
Recipe.belongsToMany(Category, {
  through: 'recipe_categories'
})

Category.belongsToMany(Recipe, {
  through: 'recipe_categories'
})

// MANY-TO-MANY ASSOCIATION FOR CATEGORIES
User.belongsToMany(Category, {
  through: 'user_categories'
})

Category.belongsToMany(User, {
  through: 'user_categories'
})

module.exports = {
  User,
  Recipe,
  Category,
  RecipeCategory,
  UserCategory,
  Suggestion
}
