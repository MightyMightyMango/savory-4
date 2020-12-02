'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Recipe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'lea@lea.com', password: '123'}),
    User.create({email: 'ellen@ellen.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const recipes = await Promise.all([
    Recipe.create({
      name: 'Cranberry Sauce with Orange and Cinnamon',
      publisher: 'Bon Appetit',
      url:
        'https://www.bonappetit.com/recipe/cranberry-sauce-with-orange-and-cinnamon',
      imageUrl:
        'https://assets.bonappetit.com/photos/5bc10bdb3f3b4638f1376c88/16:9/w_2560%2Cc_limit/cranberry-sauce-with-orange-and-cinnamon.jpg',
      description:
        'Bright citrus and warming cinnamon are the complements cranberries look for this time of the year. Blanching the chopped orange in boiling water before cooking it with the cranberries removes any bitterness from the peel and pith.',
      ingredients: [
        '1 medium navel orange, seeds removed, chopped',
        '1 lb. fresh (or frozen) cranberries',
        '1 cup sugar',
        '2 Tbsp. unsalted butter',
        '1 3"-long cinnamon stick”,”½ tsp. ground allspice',
        'Pinch of kosher salt'
      ],
      instructions: [
        'Place orange in a large saucepan and pour in cold water to come 1 up sides of pan. Bring to a boil, then remove immediately from heat and drain orange in a mesh sieve or colander. Rinse under cold water; return to saucepan. Add cranberries, sugar, butter, cinnamon, allspice, and salt and bring to a boil, stirring to dissolve sugar.',
        'Cook, stirring often and reducing heat as needed to avoid scorching, until cranberries burst, juices are syrupy, and pan is visible when a wooden spoon is dragged across the bottom, 12–15 minutes. Let cool.',
        'Do Ahead: Sauce can be made 1 week ahead. Cover and chill.'
      ]
    }),
    Recipe.create({
      name: "BA's Best Pesto",
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/best-pesto',
      imageUrl:
        'https://assets.bonappetit.com/photos/5b72f35c7278c24ab618f773/16:9/w_2560%2Cc_limit/ba-best-pesto-1.jpg',
      description:
        "The key for this classic pesto recipe is to add the basil at the very end instead of blending everything all at once. That way the basil doesn’t get bruised or lose its flavor and maintains its vibrant green color. This is part of BA's Best, a collection of our essential recipes.",
      ingredients: [
        '1/2 cup pine nuts”,”3 oz. Parmesan, grated (about ¾ cup)',
        '2 garlic cloves, finely grated”,”6 cups basil leaves (about 3 bunches)',
        '¾ cup extra-virgin olive oil',
        '1 tsp. kosher salt'
      ],
      instructions: [
        'Preheat oven to 350°. Toast pine nuts on a rimmed baking sheet, tossing once halfway through, until golden brown, 5–7 minutes. Transfer to a food processor and let cool. Add cheese and garlic and pulse until finely ground, about 1 minute. Add basil and place the top back on. With the motor running, add oil in a slow and steady stream until pesto is mostly smooth, with just a few flecks of green, about 1 minute. Season with salt.',
        'Do Ahead: Pesto can be made 1 day ahead. Top with 1/2 cup oil to prevent browning. Cover with plastic wrap, pressing directly onto surface, and chill.',
        'Cooks’ Note: If you want to use this with pasta, cook 12 oz. dried pasta (we prefer long pasta for pesto) in a large pot of boiling salted water, stirring occasionally, until al dente. Drain, reserving ½ cup pasta cooking liquid.',
        'Place pesto and 2 Tbsp. unsalted butter, cut into pieces, in a large bowl. Add pasta and ¼ cup pasta cooking liquid. Using tongs, toss vigorously, adding more pasta cooking liquid if needed, until pasta is glossy and well coated with sauce. Season with salt.',
        'Divide pasta among bowls. Top with finely grated Parmesan.'
      ]
    })
  ])

  console.log(`seeded ${recipes.length} recipes`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
