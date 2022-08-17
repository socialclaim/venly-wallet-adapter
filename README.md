# Venly Wallet adapter

Use this adapter to perform actions on the venly.io custodial wallets platform.
Note : only wallet creation is currently supported
## Input Params

- `url`, A wallet linked URL or identifier

## Output
Returns the wallet ID in a bytes32 format if the challenge is found in the selector
```json
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "result": "5db37af90c8241b992162a8271bfa761"
 },
 "statusCode": 200
}
```

## Live on a Polygon testnet Node

If you wish to test this adapter in a test environment, please use the following oracle address and job ID :

Oracle address : [0x8B0376CF8CAcA511bB4F84b844f001B80263dfCE](https://mumbai.polygonscan.com/address/0x8B0376CF8CAcA511bB4F84b844f001B80263dfCE)

Use in solidity :
```solidity
  // configuration
  address oracle = 0x8B0376CF8CAcA511bB4F84b844f001B80263dfCE;
  bytes32 jobId = "c5a0f8caea544d75b03fb8ada31a1c65";
  uint256 oracle_fee = 0.1 * 10 ** 18;

  // Submit your request to the oracle
  Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
  request.add("url", "my_url");
  return sendChainlinkRequestTo(oracle, request, oracle_fee);

  // Callback your request is fulfilled
  function fulfill(bytes32 _requestId, bytes32 _value) public recordChainlinkFulfillment(_requestId)
  {
    _value // the wallet address in a bytes32 format
  }
}

```

## Install Locally

Install dependencies:

```bash
npm install
```

Required env variables:

```bash
export BROWSERLESS_URL="http://localhost:3000"
export VUE_APP_VENLY_API_URL="https://api-wallet-staging.venly.io"
export VUE_APP_VENLY_LOGIN_URL="https://login-staging.arkane.network"
export VUE_APP_VENLY_CLIENT_ID="Testaccount-capsule"
export VUE_APP_SECRET_ID="xxxxx"
export VUE_APP_APPLICATION_ID="xxxxx"
export VUE_APP_SOCIALCLAIM_VENLY_IDENTIFIER="identifier"
```

Run : (defaults to port 8081):

```bash
npm run start
```
