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
      "original-match-name": "string",
      "country-name-1": "string",
      "country-name-2": "string",
      "match-url": "string",
      "match-GMT-time": "string"
    }, // ...
  ], // ...
}
```
Example:
```json
{
  "WED, MAR 08 2023": [
    {
      "matchName": "South Africa vs West Indies, 2nd Test, Day 1",
      "country1": "South Africa",
      "country2": "West Indies",
      "url": "https://www.cricbuzz.com/live-cricket-scores/56192/rsa-vs-wi-2nd-test-day-1-west-indies-tour-of-south-africa-2023",
      "time": "08:00 AM GMT / 10:00 AM LOCAL"
    },
    {
      "matchName": "Hong Kong vs Bahrain, 2nd Match",
      "country1": "Hong Kong",
      "country2": "Bahrain",
      "url": "https://www.cricbuzz.com/live-cricket-scores/66806/hk-vs-bhr-2nd-match-hong-kong-quadrangular-series-2023",
      "time": "05:40 AM GMT / 01:40 PM LOCAL"
    },
    {
      "matchName": "Bangladesh vs England, 2nd T20I",
      "country1": "Bangladesh",
      "country2": "England",
      "url": "https://www.cricbuzz.com/live-cricket-scores/60868/ban-vs-eng-2nd-t20i-england-tour-of-bangladesh-2023",
      "time": "12:00 PM GMT / 06:00 PM LOCAL"
    },
  ]
}
```