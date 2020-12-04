const router = require('express').Router()
module.exports = router
const {processUrl} = require('../scrape')

router.post('*', async (req, res) => {
  try {
    let url = req.body.url
    let id = 3 // change to req.body.userId after testing is done
    let data = await processUrl(url, id)
    // let jsonData = JSON.stringify(data)
    // localStorage.setItem('recipeDraft', jsonData)
    res.send(data)
  } catch (error) {
    console.error(error)
  }
})
