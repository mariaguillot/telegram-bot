const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  res.send('es customers')
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('GET request to the homepage')
})

module.exports = router
