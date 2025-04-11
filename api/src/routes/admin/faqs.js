const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  res.send('es faqs')
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('es faqs.params')
})

module.exports = router
