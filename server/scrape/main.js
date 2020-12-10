/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {scraper1} = require('../scrape/scraper1')
const {scraper2} = require('../scrape/scraper2')

const processUrl = async (url, userId) => {
  console.log(url)
  console.log(url.includes('bonappetit.com'))
  if (url.includes('bonappetit.com/recipe')) {
    return scraper1(url, 'Bon Appetit', userId)
  } else if (url.includes('cooking.nytimes/recipes')) {
    return scraper1(url, 'New York Times Cooking', userId)
  } else if (url.includes('simplyrecipes.com/recipes')) {
    return scraper1(url, 'SimplyRecipes', userId)
  } else if (url.includes('allrecipes.com')) {
    return scraper2(url, 'AllRecipes', userId)
  } else if (url.includes('eatingwell.com')) {
    return scraper2(url, 'Eating Well', userId)
  } else if (url.includes('foodnetwork.com')) {
    return scraper2(url, 'Eating Well', userId)
  } else {
    return 'Recipe collection from this website is not supported! Please enter it using the form below.'
  }
}

//Generic Scrape is used to look at the scrape format of various websites while developing scrape functions
// const genericScrape = (url) => {
//   let website = url
//   request(website, (error, response, html) => {
//     if (!error && response.statusCode === 200) {
//       const $ = cheerio.load(html)
//       let info = $('script[type="application/ld+json"]').html()
//       let parsed = JSON.parse(info)
//       console.log(parsed)
//     }
//   })
// }

// To test the scraper, call the processUrl function on a URL string
// scraper1('https://www.food.com/recipe/gingerbread-gingerbread-cake-48219')
// processUrl('https://www.bonappetit.com/recipe/kale-and-brussels-sprout-salad')

module.exports = {processUrl}
