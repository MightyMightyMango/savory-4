/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {timescrape2} = require('./timescrape2')

//Scrape function for websites with script tag metadata in array of objects format
const scraper2 = async (url, publisher, userId) => {
  let recipeEntry
  try {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    let info = $('script[type="application/ld+json"]').html()
    let parsed = JSON.parse(info)
    let mainInfo = parsed[1]
    let instructions = mainInfo.recipeInstructions.map(item => {
      return item.text
    })
    let imageUrl = mainInfo.image ? mainInfo.image.url : ''
    imageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl
    let prepTime = timescrape2(mainInfo.prepTime) || ''
    let cookTime = timescrape2(mainInfo.cookTime) || ''
    recipeEntry = {
      url: url,
      name: mainInfo.name || '',
      description: mainInfo.description || '',
      imageUrl: imageUrl || '',
      publisher: publisher || '',
      ingredients: mainInfo.recipeIngredient || [],
      instructions: instructions || [],
      yield: mainInfo.recipeYield || '',
      prepTime: prepTime || '',
      cookTime: cookTime || '',
      categories: [],
      userId: userId || 0
    }
    return recipeEntry
  } catch (error) {
    console.error(error)
  }
}

module.exports = {scraper2}
