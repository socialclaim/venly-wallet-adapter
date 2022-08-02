const { Requester, Validator } = require('@chainlink/external-adapter')
const qs = require('qs')

const customParams = {
  endpoint: false
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const loginURL = `${process.env.VUE_APP_VENLY_LOGIN_URL}/auth/realms/Arkane/protocol/openid-connect/token`
  const serviceURL = `${process.env.VUE_APP_VENLY_API_URL}/api/wallets`
  const walletType = 'WHITE_LABEL'
  const secretType = 'MATIC'
  const identifier = 'type=unrecoverable'
  const description = 'a wallet'
  const pincode = '1234'

  const params = {
    walletType,
    secretType,
    identifier,
    description,
    pincode
  }

  const login_config = {
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: loginURL,
    data: qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': process.env.VUE_APP_VENLY_CLIENT_ID,
      'client_secret': process.env.VUE_APP_SECRET_ID
    }),
    timeout: 20000
  }



  Requester.request(login_config)
      .then(response => {
        const token = response.data.access_token
        console.log("token: ")
        console.log(token)

        const config = {
          method: 'post',
          headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
          url: serviceURL,
          data:  params,
          timeout: 20000
        }

        console.log(config)

        Requester.request(config)
            .then(response => {
              console.log(response.data.result.address)
              let address = null
              if (response.data && response.data.result)
                address = response.data.result.address
              callback(response.status, Requester.success(jobRunID, {data: {result: address}}))
            })
            .catch(error => {
              callback(200, Requester.success(jobRunID, {data: {result: null}}))
            })
      }).catch(error => {
        callback(200, Requester.success(jobRunID, {data: {result: null}}))
      })
}

module.exports.createRequest = createRequest
