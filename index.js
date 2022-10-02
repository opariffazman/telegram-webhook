const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const secretUrl = process.env.SECRET_URL
app.post(`/${secretUrl}`, (req, res) => {
  console.log('webhook received')
  res.status(200).json('webhook received')
})

const port = process.env.PORT || 443 || 80 || 88 || 8443
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
