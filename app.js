const createRequest = require('./index').createRequest

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.EA_PORT || 8080
app.use(bodyParser.json())

const configurationError = (data) => {
  console.log(data)
  return false
}

if (!process.env.BROWSERLESS_URL)
  throw configurationError("BROWSERLESS_URL is not set")

app.post('/', (req, res) => {
  createRequest(req.body, (status, result) => {
    res.status(status).json(result)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
