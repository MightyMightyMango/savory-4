/* eslint-disable complexity */
const request = require('request')
const cheerio = require('cheerio')

let data = []

//Scraper for Bon Appetit && SimplyRecipes
const scraper1 = (url, publisher, userId) => {
  let website = url
  let recipeEntry = {}

  request(website, (error, response, html) => {
    if (error) {
      console.error(error)
    }
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
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
      let thumbnail_url = parsed.thumbnailUrl
        ? parsed.thumbnailUrl
        : parsed.image
      recipeEntry = {
        url: website,
        name: parsed.name || '',
        alt_headline: parsed.description || '',
        thumbnail_url: thumbnail_url || '',
        publisher_name: publisher,
        ingredients: parsed.recipeIngredient || [],
        instructions: instructions || [],
        yield: parsed.recipeYield || '',
        prepTime: parsed.prepTime || '',
        cookTime: parsed.cookTime || '',
        categories: [],
        userId: userId || 0
      }
    }
    //post recipe entry
    data.pop()
    data.push(recipeEntry)
  })
  return data[0]
}

//AllRecipes Scraper
const scraper2 = (url, publisher, userId) => {
  let website = url
  request(website, (error, response, html) => {
    if (error) {
      console.error(error)
    }
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      let info = $('script[type="application/ld+json"]').html()
      let parsed = JSON.parse(info)
      let mainInfo = parsed[1]
      let instructions = mainInfo.recipeInstructions.map(item => {
        return item.text
      })
      let thumbnail_url = mainInfo.image ? mainInfo.image.url : ''
      let recipeEntry = {
        url: website,
        name: mainInfo.name || '',
        alt_headline: mainInfo.description || '',
        thumbnail_url: thumbnail_url || '',
        publisher_name: publisher || '',
        ingredients: mainInfo.recipeIngredient || [],
        instructions: instructions || [],
        yield: mainInfo.recipeYield || '',
        prepTime: mainInfo.prepTime || '',
        cookTime: mainInfo.cookTime || '',
        categories: [],
        userId: userId || 0
      }
    }
    //post recipe entry
    data.pop()
    data.push(recipeEntry)
  })
  return data[0]
}

const processUrl = (url, userId) => {
  console.log('Scrape Process Url')
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

// To test the scraper, call the processUrl function on a URL string
//scraper1("https://www.food.com/recipe/gingerbread-gingerbread-cake-48219");
//processUrl("https://www.bonappetit.com/recipe/seedy-sweet-potato-oatmeal");

module.exports = {scraper1, processUrl}
