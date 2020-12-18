/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')
const {timescrape3} = require('./timescrape3')

//Scrape function for websites with script tag metadata in object format
const scraper4 = async (url, publisher, userId) => {
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
      let mapped = []
      parsed.recipeInstructions.map(item => {
        if (item.itemListElement) {
          item.itemListElement.map(step => {
            mapped.push(step.text)
          })
        } else {
          mapped.push(item.text)
        }
      })
      instructions = mapped
      // return item.text.replace(/(\r\n|\n|\r)/gm, '')
    }

    let imageUrl = parsed.thumbnailUrl ? parsed.thumbnailUrl : parsed.image
    imageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl

    let prepTime = parsed.prepTime ? timescrape3(parsed.prepTime) : ''
    let cookTime = parsed.cookTime ? timescrape3(parsed.cookTime) : ''
    // let prepTime = parsed.prepTime
    // let cookTime = parsed.cookTime

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

// scraper4(
//     'https://gimmedelicious.com/pecan-pie-cheesecake/',
//     'Gimme Delicious',
//     1
//   )
