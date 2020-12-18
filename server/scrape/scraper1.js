/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {timescrape1} = require('./timescrape1')

//Scrape function for websites with script tag metadata in object format
const scraper1 = async (url, publisher, userId) => {
  let recipeEntry
  try {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    let info = $('script[type="application/ld+json"]').html()
    let parsed = JSON.parse(info)
    let instructions = parsed.recipeInstructions || ''
    //if instructions are array, map over them
    if (Array.isArray(parsed.recipeInstructions)) {
      instructions = parsed.recipeInstructions.map(item => {
        //removenewline symbols
        return item.text.replace(/(\r\n|\n|\r)/gm, '')
      })
    }
    let imageUrl = parsed.thumbnailUrl ? parsed.thumbnailUrl : parsed.image
    imageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl
    let prepTime = parsed.prepTime ? timescrape1(parsed.prepTime) : ''
    let cookTime = parsed.cookTime ? timescrape1(parsed.cookTime) : ''
    let recipeYield =
      publisher === 'Bon Appetit' && parsed.servingSizeInfo
        ? parsed.servingSizeInfo.description
        : parsed.recipeYield
    recipeEntry = {
      url: url,
      name: parsed.name || '',
      description: parsed.description || '',
      imageUrl: imageUrl || '',
      publisher: publisher,
      ingredients: parsed.recipeIngredient || [],
      instructions: instructions || [],
      yield: recipeYield || '',
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

module.exports = {scraper1}
