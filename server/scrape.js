/* eslint-disable complexity */
const cheerio = require('cheerio')
const axios = require('axios')

let data = []

//Scraper for Bon Appetit && SimplyRecipes
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
    recipeEntry = {
      url: url,
      name: parsed.name || '',
      description: parsed.description || '',
      imageUrl: imageUrl || '',
      publisher: publisher,
      ingredients: parsed.recipeIngredient || [],
      instructions: instructions || [],
      yield: parsed.recipeYield || '',
      prepTime: parsed.prepTime || '',
      cookTime: parsed.cookTime || '',
      categories: [],
      userId: userId || 0
    }
    console.log(recipeEntry)
    return recipeEntry
  } catch (error) {
    console.error(error)
  }
}

//AllRecipes Scraper
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
    recipeEntry = {
      url: url,
      name: mainInfo.name || '',
      description: mainInfo.description || '',
      imageUrl: imageUrl || '',
      publisher: publisher || '',
      ingredients: mainInfo.recipeIngredient || [],
      instructions: instructions || [],
      yield: mainInfo.recipeYield || '',
      prepTime: mainInfo.prepTime || '',
      cookTime: mainInfo.cookTime || '',
      categories: [],
      userId: userId || 0
    }
    return recipeEntry
  } catch (error) {
    console.error(error)
  }
}

const processUrl = async (url, userId) => {
  if (url.includes('bonappetit.com')) {
    return scraper1(url, 'Bon Appetit', userId)
  } else if (url.includes('cooking.nytimes')) {
    return scraper1(url, 'New York Times Cooking', userId)
  } else if (url.includes('simplyrecipes.com')) {
    return scraper1(url, 'SimplyRecipes', userId)
  } else if (url.includes('allrecipes.com')) {
    return scraper2(url, 'AllRecipes', userId)
  } else if (url.includes('eatingwell.com')) {
    return scraper2(url, 'Eating Well', userId)
  } else {
    return 'Recipe collection from this website is not supported! Please enter it using the form below.'
  }
}

//Generic Scrape is used to look at the scrape format of various websites while developing scrape functions
const genericScrape = url => {
  let website = url
  request(website, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      let info = $('script[type="application/ld+json"]').html()
      let parsed = JSON.parse(info)
      console.log(parsed)
    }
  })
}

const anonScrape = async (url, publisher, userId) => {
  try {
    let title, author, ingredients, description, instructions
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    let info = $('script[type="application/ld+json"]').html()

    if (info === null) {
      title = $('meta[property="og:title"]').attr('content')
      author = $('meta[itemprop="author"]').attr('content')
      ingredients = $('.ingredients').text()
      description = $('meta[property="og:description"]').attr('content')
      instructions = $('div[itemprop="recipeInstructions"]').text()
      console.log(title, author, ingredients, description, instructions)
    } else {
      scraper1(url, 'Fake Pubilsher', 7)
    }
  } catch (err) {
    console.error(err)
  }
}

// To test the scraper, call the processUrl function on a URL string
// scraper1('https://www.food.com/recipe/gingerbread-gingerbread-cake-48219')
//processUrl('https://www.bonappetit.com/recipe/kale-and-brussels-sprout-salad')
anonScrape(
  'https://www.epicurious.com/recipes/food/views/smoked-salmon-7-layer-dip'
)
console.log('NEW RECIPE')
//anonScrape('https://www.franksredhot.com/en-us/recipes/franks-redhot-buffalo-chicken-dip')
//anonScrape('https://www.bonappetit.com/recipe/hallacas')
anonScrape('https://www.tasteofhome.com/recipes/buffalo-chicken-dip/')
anonScrape(
  'https://www.the-girl-who-ate-everything.com/football-kickoff-buffalo-chicken-dip/'
)
module.exports = {scraper1, processUrl}
