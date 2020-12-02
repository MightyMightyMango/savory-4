const router = require('express').Router()
module.exports = router
const {processUrl} = require('../scrape')

router.post('*', (req, res) => {
  let url = req.body.url
  let id = 3 // change to req.body.userId after testing is done
  let data = processUrl(url, id)
  res.send(data)
})


