# Chainlink browserless selector matcher adapter


Use this external adapter to verify the contents of a HTML element in a web page, in a DOM-enabled environment

This external adapter requires an instance of [browserless](https://www.browserless.io/) running self-hosted or in the cloud. 
## Input Params

- `url`, the url to visit
- `selector`, CSS the selector in the page to verify,
- `challenge`, the string to find in the HTML element

## Output
Returns `true` if the challenge is found in the selector
```json
{
 "jobRunID": "278c97ffadb54a5bbb93cfec5f7b5503",
 "data": {
  "result": true
 },
 "statusCode": 200
}
```

## Live on a BSC Testnet node

If you wish to test this adapter in a test environment, please use the following oracle address and job ID :

Oracle address : [0xc897AB197611d16e4ABD18878aba8c85c8f370a9](https://testnet.bscscan.com/address/0xc897AB197611d16e4ABD18878aba8c85c8f370a9)

Use in solidity :
```solidity
  // configuration
  address oracle = 0xc897AB197611d16e4ABD18878aba8c85c8f370a9;
  bytes32 jobId = "fb4b27d00d704c3da5e16282e705f190";
  uint256 oracle_fee = 0.1 * 10 ** 18;

  // Submit your request to the oracle
  Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
  request.add("url", "my_url"); 
  request.add("selector", "my_css_selector"); 
  request.add("challenge", "my_challenge");
  return sendChainlinkRequestTo(oracle, request, oracle_fee);

  // Callback your request is fulfilled
  function fulfill(bytes32 _requestId, bool _value) public recordChainlinkFulfillment(_requestId)
  {
    _value // true if the verification was successful
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
```

Run : (defaults to port 8080):

```bash
npm run start
```

## Notes

Any error during the browserless runtime (element not found, timeout, or other errors) will result in a successful request `false` result
