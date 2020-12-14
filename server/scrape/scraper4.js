/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {timescrape2} = require('./timescrape2')

//Scrape function for websites with script tag metadata in object format
const scraper4 = async (url, publisher, userId) => {
  console.log(url.length)
  let recipeEntry
  try {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    let info = $('script[type="application/ld+json"]').html()
    let parsed = JSON.parse(info)

    let newData = {}
    if (Array.isArray(parsed['@graph'])) {
      parsed['@graph'].map(item => {
        if (item['@type'] === 'Recipe') {
          newData = item
        }
      })
      parsed = newData
    }
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

    console.log('prep time', parsed.prepTime)
    // let prepTime = parsed.prepTime ? timescrape1(parsed.prepTime) : ''
    // let cookTime = parsed.cookTime ? timescrape1(parsed.cookTime) : ''
    let prepTime = parsed.prepTime
    let cookTime = parsed.cookTime

    let recipeYield = Array.isArray(parsed.recipeYield)
      ? parsed.recipeYield[0]
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
    console.log(recipeEntry)
    return recipeEntry
  } catch (error) {
    console.error(error)
  }
}

module.exports = {scraper4}

scraper4(
  'https://www.cookingclassy.com/spinach-artichoke-dip/',
  'CookingClassy',
  1
)
scraper4(
  'https://www.spendwithpennies.com/the-best-spinach-artichoke-dip/',
  'Spend with Pennies',
  1
)
scraper4(
  'https://gimmedelicious.com/baked-buffalo-cauliflower-wings/',
  'Gimme Delicious',
  1
)
