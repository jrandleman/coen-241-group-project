# Running the Cricbuzz Livematch Schedule Scraper

## Dependencies: 

1. [node.js](https://nodejs.org/en/download/)
2. [cheerio](https://www.npmjs.com/package/cheerio)
3. [node-fetch](https://www.npmjs.com/package/node-fetch)

## Execute at the Command-Line: 
`node main.mjs`

## Result: 
A JSON data structure will be printed to the screen in the following format:
```json
{
  "GMT-date": [
    {
      "match-name": "string",
      "match-url": "string",
      "match-GMT-time": "string"
    }, // ...
  ], // ...
}
```