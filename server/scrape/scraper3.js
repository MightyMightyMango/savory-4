/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {timescrape1} = require('./timescrape1')

//This is for use with SpoonFullOfFlavor.com and is NOT finished
const scraper3 = async (url, publisher, userId) => {
  let recipeEntry
  try {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    let info = $('script[type="application/ld+json"]').html()
    let parsed = JSON.parse(info)
    let mainInfo = parsed['@graph'][7]
    let instructions = mainInfo.recipeInstructions.map(item => {
      return item.text
    })
    let imageUrl = mainInfo.image ? mainInfo.image[0] : ''
    imageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl
    let prepTime = mainInfo.prepTime ? timescrape1(mainInfo.prepTime) : ''
    let cookTime = mainInfo.cookTime ? timescrape1(mainInfo.prepTime) : ''
    let rYield = Array.isArray(mainInfo.recipeYield)
      ? mainInfo.recipeYield[0]
      : mainInfo.recipeYield
    if (publisher === 'The Food Network') {
      prepTime = ''
      cookTime = ''
    }
    recipeEntry = {
      url: url,
      name: mainInfo.name || '',
      description: mainInfo.description || '',
      imageUrl: imageUrl || '',
      publisher: publisher || '',
      ingredients: mainInfo.recipeIngredient || [],
      instructions: instructions || [],
      yield: rYield || '',
      prepTime: '',
      cookTime: '',
      categories: [],
      userId: userId || 0
    }
    return recipeEntry
  } catch (error) {
    console.error(error)
  }
}

scraper3('https://www.spoonfulofflavor.com/homemade-hot-chocolate/')

module.exports = {scraper3}
