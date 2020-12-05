'use strict'

const db = require('../server/db')
const {User, Recipe, Category, RecipeCategory} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // CREATE USERS
  const users = [
    {
      email: 'lea@lea.com',
      password: '123'
    },
    {
      email: 'ellen@ellen.com',
      password: '123'
    },
    {
      firstName: 'Micheline',
      lastName: 'Wu',
      email: 'm@m.com',
      password: '123'
    }
  ]

  const [lea, ellen, micheline] = await User.bulkCreate(users)

  console.log(`seeded ${users.length} users`)

  // CREATE CATEGORIES
  const categories = [
    {category: 'dessert'},
    {category: 'dinner'},
    {category: 'western'},
    {category: 'thanksgiving'}
  ]

  const [dessert, dinner, western, thanksgiving] = await Category.bulkCreate(
    categories
  )

  // CREATE RECIPES
  const recipes = [
    {
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
      ],
      isDraft: false,
      categoryIds: [thanksgiving.id]
    },
    {
      name: 'Gluten-Free Carrot Cake',
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/gluten-free-carrot-cake',
      imageUrl:
        'https://assets.bonappetit.com/photos/5ad0cb51d2b1c178c2958930/16:9/w_2560%2Cc_limit/gluten-free-carrot-cake.jpg',
      description:
        'Almond flour is a wonderfully sweet, nutty complement for fresh carrots, walnuts, and raisins. If you can’t find it, though, here’s a trick: use 2¼ cups whole almonds and pulse them in a food processor along with salt, baking powder, all three spices, and baking soda until very, very finely ground.',
      ingredients: [
        '1 medium navel orange, seeds removed, chopped',
        '1 lb. fresh (or frozen) cranberries',
        '1 cup sugar',
        '2 Tbsp. unsalted butter',
        '1 3"-long cinnamon stick”,”½ tsp. ground allspice',
        'Pinch of kosher salt'
      ],
      instructions: [
        'CAKE',
        '½ cup virgin coconut oil, melted, plus more for pans',
        '3 cups almond flour, plus more for dusting pans',
        '1½ tsp. kosher salt',
        '1 tsp. baking powder',
        '1 tsp. ground cardamom',
        '1 tsp. ground cinnamon',
        '1 tsp. ground ginger',
        '½ tsp. baking soda',
        '5 large eggs',
        '1¼ cups (packed) dark brown sugar',
        '1 tsp. vanilla extract',
        '10 oz. carrots, peeled, coarsely shredded, squeezed firmly to expel excess water',
        '¾ cup shredded unsweetened coconut',
        '¾ cup walnuts, finely chopped',
        '½ cup golden raisins',
        'FROSTING AND ASSEMBLY',
        '8 oz. cream cheese, room temperature',
        '½ cup (1 stick) unsalted butter, room temperature',
        '1¼ cups gluten-free powdered sugar',
        '⅓ cup Greek yogurt',
        '1 tsp. vanilla extract',
        'Pinch of kosher salt'
      ],
      categoryIds: [western.id, dessert.id]
    },
    {
      name: 'Grilled Crispy-Skinned Salmon with Whole Lemon-Sesame Sauce',
      publisher: 'Bon Appetit',
      url:
        'https://www.bonappetit.com/recipe/grilled-salmon-with-lemon-sesame-sauce',
      imageUrl:
        'https://assets.bonappetit.com/photos/5cdf092bccd61f6e954c2e7d/16:9/w_2560%2Cc_limit/crispy-skinned-salmon-with-whole-lemon-sesame-sauce-.jpg',
      ingredients: [
        '4 6-oz. skin-on salmon fillets, pin bones removed, patted dry',
        'Tbsp. plus ⅓ cup extra-virgin olive oil, plus more for grill',
        'Kosher salt',
        '1 small lemon',
        '1 small shallot, finely chopped',
        '2 tsp. black sesame seeds',
        '1 tsp. honey',
        '½ tsp. toasted sesame oil',
        '1 cup torn basil leaves',
        'Black pepper'
      ],
      instructions: [
        'Prepare a grill for medium heat. Rub salmon with 2 Tbsp. olive oil; season both sides with salt.',
        'Cut ends off lemon and discard. Place lemon upright and slice off outer lobes in 4 sections, leaving a square-shaped core and seeds behind. Finely chop lobes (flesh, pith, and all) and transfer to a small bowl (you should have about ⅓ cup). Squeeze out juice from core over bowl. Add shallot, sesame seeds, honey, sesame oil, and remaining ⅓ cup olive oil; season with salt and lots of pepper. Toss to combine.',
        'Clean and oil grate, then immediately place salmon on grill skin side down. Cover grill and cook, skin side down the entire time, until skin is lightly charred and fish is opaque, 6–8 minutes. Transfer salmon to a plate and let cool slightly.',
        'Divide salmon among plates. Top with basil. Spoon lemon-sesame sauce over.'
      ],
      categoryIds: [dinner.id]
    },
    {
      name: "BA's Best Pesto",
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/best-pesto',
      imageUrl:
        'https://assets.bonappetit.com/photos/5b72f35c7278c24ab618f773/16:9/w_2560%2Cc_limit/ba-best-pesto-1.jpg',
      description:
        "Bright citrus and warming cinnamon are the complements cranberries look for this time of the year. Blanching the chopped orange in boiling water before cooking it with the cranberries removes The key for this classic pesto recipe is to add the basil at the very end instead of blending everything all at once. That way the basil doesn’t get bruised or lose its flavor and maintains its vibrant green color. This is part of BA's Best, a collection of our essential recipes. bitterness from the peel and pith.",
      ingredients: [
        '½ cup pine nuts',
        '3 oz. Parmesan, grated (about ¾ cup)',
        '2 garlic cloves, finely grated',
        '6 cups basil leaves (about 3 bunches)',
        '¾ cup extra-virgin olive oil',
        '1 tsp. kosher salt'
      ],
      instructions: [
        'Preheat oven to 350°. Toast pine nuts on a rimmed baking sheet, tossing once halfway through, until golden brown, 5–7 minutes. Transfer to a food processor and let cool. Add cheese and garlic and pulse until finely ground, about 1 minute. Add basil and place the top back on. With the motor running, add oil in a slow and steady stream until pesto is mostly smooth, with just a few flecks of green, about 1 minute. Season with salt.',
        'Do Ahead: Pesto can be made 1 day ahead. Top with ½" oil to prevent browning. Cover with plastic wrap, pressing directly onto surface, and chill.',
        'Cooks’ Note: If you want to use this with pasta, cook 12 oz. dried pasta (we prefer long pasta for pesto) in a large pot of boiling salted water, stirring occasionally, until al dente. Drain, reserving ½ cup pasta cooking liquid.',
        'Place pesto and 2 Tbsp. unsalted butter, cut into pieces, in a large bowl. Add pasta and ¼ cup pasta cooking liquid. Using tongs, toss vigorously, adding more pasta cooking liquid if needed, until pasta is glossy and well coated with sauce. Season with salt.',
        'Divide pasta among bowls. Top with finely grated Parmesan.'
      ],
      isDraft: false,
      categoryIds: []
    },
    {
      name: 'Lemon Pound Cake',
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/lemon-pound-cake',
      imageUrl:
        'https://assets.bonappetit.com/photos/5bb50be0fd392d354d90b131/16:9/w_2560%2Cc_limit/Basically-Lemon-Pound-Cake-03.jpg',
      ingredients: [
        '1 cup (2 sticks) unsalted butter, room temperature, plus more for pan',
        '3 lemons',
        '1 cup granulated sugar',
        '3 large eggs',
        '1¾ cups all-purpose flour',
        '1½ tsp. baking powder',
        '½ tsp. kosher salt',
        '6 Tbsp. whole milk',
        '1½ cups powdered sugar'
      ],
      instructions: [
        'Place a rack in center of oven; preheat to 350°. Butter a 9x4" loaf pan, fully coating bottom and sides. Line pan lengthwise with parchment paper, leaving about a 2" overhang. Are you reading this and wondering, "Can I use wax paper instead of parchment paper?" The answer is: absolutely NOT. That strip of parchment paper will help you to lift the finished cake out of the loaf pan cleanly. Wax paper, on the other hand, will melt and stick to the cake—it\'s never meant to go into the oven. Now you know!',
        'Using a Microplane, finely grate the zest from 2 lemons into a large bowl. Add 1 cup (2 sticks) unsalted room temperature butter and 1 cup granulated sugar to bowl. It might be tempting to ignore the part about the butter being "room temperature," but working with butter that\'s soft and spreadable—but not melted—is essential here.',
        "Using an electric mixer on high speed, beat until mixture is very light and fluffy, about 5 minutes. You know how people talk about \"creaming\" butter and sugar together? That's what you're doing here. You're basically whipping a bunch of air into the butter and sugar mixture, which will help keep the finished cake light and fluffy. And as we mentioned in the last step, that butter needs to be room temp in order for this to work.",
        'Beat in 3 eggs one at a time, waiting until each is incorporated before adding the next. Continue to beat until mixture is lighter and even fluffier, about 2 minutes.',
        'Whisk 1¾ cups all-purpose flour, 1½ tsp. baking powder, and ½ tsp. salt in another large bowl. It might seem funny to add salt to a dessert recipe, but a little bit helps to make all of the rich, sweet elements really sing.”,”Add one-half of dry ingredients to butter mixture and beat on low speed just until combined.',
        "Beat in 6 Tbsp. milk on low just until smooth, then add remaining dry ingredients and beat just until combined. Now that you've added the flour, you want to mix the batter as little as possible—if you beat it up too much, you'll start to form gluten, which will make the cake tough. Using a spatula, scrape down sides of bowl and give batter a final mix so dry ingredients are fully incorporated.",
        'While the cake bakes, make the glaze: First, remove zest from remaining lemon with a vegetable peeler in wide strips. (FWIW, if this part seems overly fussy or annoying, you can feel free to just use a Microplane to zest all of the lemons for the glaze, but we think doing it this way looks cuter.)',
        'Transfer zest to a cutting board and slice as thinly as possible; set aside.',
        'Halve 2 lemons (the ones you already zested) and squeeze the juice into a small bowl with a reamer or fork (you should have about ½ cup lemon juice).',
        'Place 1½ cups powdered sugar in another medium bowl. Slowly whisk in about half of lemon juice until smooth, then add sliced lemon zest; set glaze aside.',
        "Let cake cool about 10 minutes. (Yeah, it really does need to cool a bit, so set a timer if you're impatient.) Poke 10-15 holes evenly throughout cake with a cake tester or toothpick. Pour the remaining lemon juice—the stuff that didn't end up going into the glaze—over the top of the cake. Let cool completely. (Seriously!)",
        'Run a butter knife around edges of pan to loosen. Using parchment overhang, lift cake onto a wire rack; remove parchment.”,”Now, pour the lemon zest glaze over cake, letting it fall down the sides. Let icing set for at least 10 minutes before slicing. Serve on its own, or with a spoonful of Greek yogurt, a dollop of whipped cream, or a scoop of ice cream on top. (You deserve it!)'
      ],
      isDraft: false,
      categoryIds: []
    },
    {
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
      ],
      isDraft: false,
      categoryIds: []
    },
    {
      name: 'Chicken Paprikash with Buttered Egg Noodles',
      publisher: 'Bon Appetit',
      url:
        'https://www.bonappetit.com/recipe/chicken-paprikash-with-buttered-egg-noodles',
      imageUrl:
        'https://assets.bonappetit.com/photos/5a3830655a60b108cf7a9492/1:1/w_1024%2Cc_limit/chicken-paprikash-16x9.jpg',
      description:
        'What’s more comforting than saucy chicken over buttered egg noodles?? Nothing. To ensure the silkiest, noodle-coating sauce, make sure the sour cream is room temperature so it blends seamlessly into the hot tomato sauce (otherwise, it might separate and give the sauce a curdled look).',
      ingredients: [
        'Kosher salt',
        'Freshly ground black pepper',
        '1 large onion',
        '4 garlic cloves',
        '3 tablespoons unsalted butter, divided',
        '3 tablespoons paprika',
        '¼ teaspoon cayenne pepper',
        '1 15-ounce can crushed tomatoes',
        '12 ounces egg noodles',
        '½ cup parsley leaves with tender stems'
      ],
      instructions: [
        'Preheat oven to 300°. Take sour cream out of fridge—it needs to come to room temperature. Place 2½ pounds chicken thighs on a plate and pat dry with paper towels. Season both sides with salt and pepper.',
        'Set chicken aside for a few minutes and bang out your other prep. Peel and chop 1 onion. Smash 4 garlic cloves with the flat side of your knife and peel. Open 15-oz. can tomatoes.',
        'Heat a large ovenproof skillet over medium-high. Add 1 Tbsp. butter and swirl to melt. Using tongs, add chicken skin side down and cook, lifting up thighs once or twice to let rendered hot fat run underneath, until skin is golden brown and crisp, 8–10 minutes. Transfer chicken skin side up to a plate.',
        'Pour off fat from skillet into a small heatproof bowl, leaving a thin layer coating the bottom (reserve fat for another use). Reduce heat to low. Add onion and garlic; season with salt and pepper. Cook, stirring often to dissolve browned bits on bottom of skillet, until onions are translucent, 6–8 minutes.',
        'Add 3 Tbsp. paprika and ¼ tsp. cayenne. Cook, stirring constantly, just until onions are evenly coated and spices are fragrant, about 30 seconds (the spices burn very easily, turning them bitter and chalky, so make sure to keep them moving in skillet and have can of tomatoes close at hand).',
        'Add tomatoes to skillet. Fill can two-thirds with water and swirl, then add to skillet. Stir until incorporated, season with several pinches of salt, and bring to a simmer.',
        'Using tongs, arrange thighs skin side up back in skillet (along with any accumulated juices), nestling into liquid but not submerging (you want the skin to be exposed so it stays crispy).',
        'Transfer skillet to oven and roast until chicken is fully cooked and tender enough to release from the bone when prodded with a fork, 35–40 minutes.',
        'About halfway through chicken cook time in the oven, bring a large pot of salted water to a boil. Add 12 oz. egg noodles and cook according to package instructions, stirring occasionally with tongs. Drain noodles in a colander. Transfer to a large bowl, add remaining 2 Tbsp. butter, and toss to coat until butter is melted and noodles are coated. Season with salt and pepper.',
        'Finely chop ½ cup parsley and add half to noodles; toss to coat.',
        "Carefully remove skillet from oven (handle will be hot!). Using tongs, transfer chicken skin side up to a clean plate. Taste sauce and season with more salt and pepper, if needed. Spoon about ¼ cup sauce into a small bowl and stir in sour cream until smooth (this slowly brings up the temperature of the sour cream so it doesn't split when it hits the hot skillet). Pour back into skillet and stir to combine.",
        'Arrange chicken thighs and juices back in skillet and top with remaining chopped parsley. Serve over noodles.'
      ],
      categoryIds: []
    },
    {
      name: 'Ramen Noodles with Miso Pesto',
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/miso-pesto-with-ramen-noodles',
      imageUrl:
        'https://assets.bonappetit.com/photos/5a7c92fb8ca2430893f4dafe/16:9/w_2560%2Cc_limit/miso-pesto-with-ramen-noodles.jpg',
      description:
        'Springy ramen noodles and a cilantro-miso sauce bring a welcome twist to a classic pesto recipe.',
      ingredients: [
        '4 cups baby spinach',
        '2 cups cilantro leaves with tender stems',
        '1 Tbsp. white miso',
        '1 garlic clove',
        '½ cup grapeseed or sunflower oil',
        '1 tsp. toasted sesame oil',
        ' 1 tsp. fresh lemon juice',
        'Kosher salt',
        '2 5-oz. packages fresh ramen noodles (you can find them fresh at Asian grocery stores and some Whole Foods—we like the Sun Noodle brand)',
        '1 Tbsp. unsalted butter, cut into small pieces',
        'Toasted sesame seeds (for serving)'
      ],
      instructions: [
        'Preheat oven to 350°. Toast pine nuts on a rimmed baking sheet, tossing once halfway through, until golden brown, 5–7 minutes. Transfer to a food processor and let cool. Add cheese and garlic and pulse until finely ground, about 1 minute. Add basil and place the top back on. With the motor running, add oil in a slow and steady stream until pesto is mostly smooth, with just a few flecks of green, about 1 minute. Season with salt.',
        'Do Ahead: Pesto can be made 1 day ahead. Top with 1/2 cup oil to prevent browning. Cover with plastic wrap, pressing directly onto surface, and chill.',
        'Cooks’ Note: If you want to use this with pasta, cook 12 oz. dried pasta (we prefer long pasta for pesto) in a large pot of boiling salted water, stirring occasionally, until al dente. Drain, reserving ½ cup pasta cooking liquid.',
        'Place pesto and 2 Tbsp. unsalted butter, cut into pieces, in a large bowl. Add pasta and ¼ cup pasta cooking liquid. Using tongs, toss vigorously, adding more pasta cooking liquid if needed, until pasta is glossy and well coated with sauce. Season with salt.',
        'Divide pasta among bowls. Top with finely grated Parmesan.'
      ],
      isDraft: false,
      categoryIds: [dinner.id]
    },
    {
      name: 'Classic Focaccia Bread',
      publisher: 'Bon Appetit',
      url: 'https://www.bonappetit.com/recipe/focaccia-bread',
      imageUrl:
        'https://assets.bonappetit.com/photos/5a958968eb730726d6c7e758/16:9/w_2560%2Cc_limit/0318-Go-Live-Focaccia-1.jpg',
      description:
        'Our focaccia has a moist but airy crumb sandwiched between thin but ultra-crunchy top and bottom crusts, thanks to a generous amount of olive oil in the pan and on top of the dough. If you don’t already have a standard 18x13 inch half sheet pan, we recommend getting one for this recipe so you have just the right proportion of crumb to crust. Make sure the pan is very clean before you start; otherwise, the dough might have a tendency to stick during baking.',
      ingredients: [
        '6¼ cups bread flour (30 oz. or 850g)',
        '2¼ tsp. active dry yeast (from one ¼-oz. packet)',
        'Pinch of sugar',
        '2 Tbsp. Diamond Crystal or 1 Tbsp. Morton kosher salt',
        '5 Tbsp. extra-virgin olive oil, divided, plus more for greasing and drizzling',
        'Flaky sea salt'
      ],
      instructions: [
        'Combine flour and 2½ cups room-temperature water in the bowl of a stand mixer fitted with the dough hook. Mix on low speed, scraping down sides and hook as needed to incorporate any dry flour, until a shaggy dough forms. Remove dough hook and cover bowl with plastic. Let sit while you prepare the yeast (you can leave the dough in this state up to 2 hours).',
        'Stir yeast, sugar, and ½ cup warm water with a fork in a small bowl to dissolve. Let sit until yeast is foamy, about 5 minutes.',
        'Pour yeast mixture into stand mixer bowl and mix on low speed until dough absorbs all additional water, about 1 minute (pulse mixer on and off a couple of times at very beginning to prevent liquid from splashing over the sides). Add kosher salt and continue to mix, increasing speed to medium, until dough is extremely elastic and very sticky (it will look more like a thick batter and will stick to sides of bowl), about 5 minutes.',
        'Pour 3 Tbsp. oil into a large (preferably glass) bowl and swirl to coat sides. Scrape in dough with a large spatula or flexible bench scraper. Cover and place in a warm spot until dough is doubled in volume, 2–3 hours. If using a glass bowl, it’s helpful to mark the position of the dough at the beginning so you can accurately assess the rise (a dry-erase marker or piece of tape works).',
        'Drizzle 2 Tbsp. oil over a 18x13" sheet pan and use fingertips to rub all over bottom and sides. Using large spatula or flexible bench scraper, fold dough inside bowl a couple of times to deflate, then scrape onto prepared baking sheet. Using oiled hands, lift up dough and fold over onto itself in half, then rotate baking sheet 90° and fold in half again. Cover dough with a piece of well-oiled plastic and let rest 10 minutes to let gluten relax.',
        'Uncover and go back in with oiled hands, gently stretching dough (to avoid tearing) across length and width of baking sheet in an even layer, working all the way to edges and into corners. If dough starts to spring back, let sit 5–10 minutes and start again. Cover again with same piece of oiled plastic and chill at least 8 hours and up to 24.',
        "Let sheet pan sit in a warm spot until dough is puffed and bubbly and nearly doubled in height, 45–65 minutes (if you're using a standard half sheet pan, it will have risen to the very top of the sides). Meanwhile, place a rack in center of oven; preheat to 450°.",
        'Remove plastic and drizzle dough generously with more oil. Oil hands again and press fingertips firmly into dough, pushing down all the way to bottom of pan to dimple all over. Sprinkle generously with sea salt.',
        'Bake focaccia until surface is deep golden brown all over, 25–35 minutes. Let cool in pan 10 minutes. Slide a thin metal spatula underneath focaccia to loosen from sheet pan (it may stick in a couple of places, so use some elbow grease to get underneath) and transfer to a wire rack. Let cool completely before cutting as desired.'
      ],
      isDraft: false,
      categoryIds: []
    }
  ]

  const createdRecipes = await Recipe.bulkCreate(recipes)

  const [
    cranberry,
    carrot,
    salmon,
    pesto,
    lemon,
    pesto1,
    chicken,
    ramen,
    bread
  ] = createdRecipes

  // SET ASSOCIATIONS FOR RECIPES WITH USERS
  // await cranberry.setUser(lea, { category: 'thanksgiving'})
  // await cranberry.setUser(lea, { category: 'thanksgiving'})
  await cranberry.setUser(lea)
  await carrot.setUser(lea)
  await salmon.setUser(lea)
  await pesto.setUser(lea)
  await lemon.setUser(lea)
  await pesto1.setUser(ellen)
  await chicken.setUser(lea)
  await ramen.setUser(lea)
  await bread.setUser(lea)

  console.log(`seeded ${recipes.length} recipes`)

  // RECIPECATEGORY
  const flattenRecipeCategories = recipesToFlatten => {
    const recipeCategoriesArray = []

    return recipesToFlatten.reduce(
      (accumulator, currentRecipe, indexOfRecipe) => {
        const recipeValues = currentRecipe.dataValues
        const currentRecipeCategories = recipeValues.categoryIds.map(
          categoryId => {
            return {categoryId, recipeId: indexOfRecipe + 1}
          }
        )

        return accumulator.concat(currentRecipeCategories)
      },
      recipeCategoriesArray
    )
  }

  const recipeCategories = flattenRecipeCategories(createdRecipes)
  await RecipeCategory.bulkCreate(recipeCategories)
  console.log('Seeded recipe_categories')

  console.log(`all seeded successfully`)
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
