const { Requester, Validator } = require('@chainlink/external-adapter')
const qs = require('qs')

const customParams = {
  url: ['url'],
  mode: ['mode'],
  endpoint: false,
  recipient: false,
  walletID: false
}

const createRequest = (input, callback) => {
  const validator = new Validator(callback, input, customParams)
  const jobRunID = validator.validated.id
  const mode = validator.validated.data.mode
  const walletID = validator.validated.data.walletID
  const recipient = validator.validated.data.recipient
  const loginURL = `${process.env.VUE_APP_VENLY_LOGIN_URL}/auth/realms/Arkane/protocol/openid-connect/token`
  const serviceURL = `${process.env.VUE_APP_VENLY_API_URL}/api/wallets`
  const walletType = 'WHITE_LABEL'
  const secretType = 'MATIC'
  const identifier = 'socialclaim'
  const pincode = '1234'
  const url = validator.validated.data.url

  console.log(mode)
  console.log(mode)
  console.log(walletID)
  console.log(recipient)

  const params = {
    walletType,
    secretType,
    identifier,
    pincode,
    'description': url
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
        const config = {
          method: 'post',
          headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
          url: serviceURL,
          data:  params,
          timeout: 20000
        }
        if (mode == 'getWallets') {
          Requester.request(config)
              .then(response => {
                let id = null
                if (response.data && response.data.result)
                  id = response.data.result.id.replace(/-/g,'')
                callback(response.status, Requester.success(jobRunID, {data: {result: id}}))
              })
              .catch(error => {
                callback(200, Requester.success(jobRunID, {data: {result: null}}))
              })
        } else if (mode == 'executeTransfer') {

        } else {
          callback(200)
        }
      }).catch(error => {
        callback(200, Requester.success(jobRunID, {data: {result: null}}))
      })
}

module.exports.createRequest = createRequest
