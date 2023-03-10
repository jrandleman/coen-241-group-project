<!-- README.md -->

# Lambda Function Use

`index.js` has the core code that the lambda function executes. Pass the cricket match URL you want to parse as a query string parameter while performing a GET request to the following API gateway:
* `https://22m1jusvp4.execute-api.us-east-1.amazonaws.com/default/LiveCricketPlayerScraperLambda?url=<CRICKET-MATCH-URL-HERE>`


# Local Use 
`node scraper.js`


# Credit
Adapted from [this GitHub repository](https://github.com/mskian/cricket-api-nodejs)