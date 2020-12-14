/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {scraper1} = require('../scrape/scraper1')
const {scraper2} = require('../scrape/scraper2')
const {scraper4} = require('../scrape/scraper4')

const processUrl = async (url, userId) => {
  if (url.includes('bonappetit.com/recipe')) {
    return scraper1(url, 'Bon Appetit', userId)
  } else if (url.includes('cooking.nytimes.com/recipes')) {
    return scraper1(url, 'New York Times Cooking', userId)
  } else if (url.includes('simplyrecipes.com/recipes')) {
    return scraper1(url, 'SimplyRecipes', userId)
  } else if (url.includes('allrecipes.com/recipe')) {
    return scraper2(url, 'AllRecipes', userId)
  } else if (url.includes('foodnetwork.com/recipes')) {
    return scraper2(url, 'The Food Network', userId)
  } else if (url.includes('eatingwell.com/recipe')) {
    return scraper2(url, 'Eating Well', userId)
  } else if (url.includes('tasty.co/recipe')) {
    return scraper1(url, 'Tasty', userId)
  } else if (url.includes('cookingclassy.com')) {
    return scraper4(url, 'CookingClassy', userId)
  } else if (url.includes('spendwithpennies.com')) {
    return scraper4(url, 'Spend with Pennies', userId)
  } else if (url.includes('gimmedelicious.com')) {
    return scraper4(url, 'Gimme Delicious', userId)
  } else {
    return 'error'
  }
}

// const genericScrape = async (url) => {
//   const html = await axios.get(url)
//   const $ = cheerio.load(html.data)
//   let info = $('script[type="application/ld+json"]').html()
//   let parsed = JSON.parse(info)
//   console.log(parsed['@graph'][7])
// }

// genericScrape('https://www.spoonfulofflavor.com/homemade-hot-chocolate/')

module.exports = {processUrl}
