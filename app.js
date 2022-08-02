const createRequest = require('./index').createRequest

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.EA_PORT || 8081
app.use(bodyParser.json())

const configurationError = (data) => {
  console.log(data)
  return false
}

if (!process.env.VUE_APP_VENLY_API_URL)
  throw configurationError("VUE_APP_VENLY_API_URL is not set")
if (!process.env.VUE_APP_VENLY_LOGIN_URL)
  throw configurationError("VUE_APP_VENLY_LOGIN_URL is not set")
if (!process.env.VUE_APP_VENLY_CLIENT_ID)
  throw configurationError("VUE_APP_VENLY_CLIENT_ID is not set")
if (!process.env.VUE_APP_SECRET_ID)
  throw configurationError("VUE_APP_SECRET_ID is not set")
if (!process.env.VUE_APP_APPLICATION_ID)
  throw configurationError("VUE_APP_APPLICATION_ID is not set")

app.post('/', (req, res) => {
  createRequest(req.body, (status, result) => {
    res.status(status).json(result)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
