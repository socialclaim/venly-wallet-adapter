const { Requester, Validator } = require('@chainlink/external-adapter')

const customParams = {
  url: ['url'],
  selector: ['selector'],
  challenge: ['challenge'],
  endpoint: false
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const serviceURL = "${process.env.BROWSERLESS_URL}/scrape?stealth"
  const url = validator.validated.data.url
  const challenge = validator.validated.data.challenge
  const elements = [{ selector: validator.validated.data.selector }]

  const params = {
    url,
    elements
  }

  const config = {
    method: 'post',
    url: serviceURL,
    data: params,
    timeout: 20000
  }

  Requester.request(config)
    .then(response => {
      console.log(response)
      let match = false
      if (response.data && response.data.data[0] && response.data.data[0].results[0]) {
        match = response.data.data[0].results[0].html.includes(challenge)
      }
      callback(response.status, Requester.success(jobRunID, {data: {result: match}}))
    })
    .catch(error => {
      callback(200, Requester.success(jobRunID, {data: {result: false}}))
    })
}

module.exports.createRequest = createRequest
