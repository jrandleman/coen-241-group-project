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
  "YYYY-MM-DD (GMT date)": [
    {
      "match-name": "string",
      "country-name-1": "string",
      "country-name-2": "string",
      "match-url": "string",
      "match-human-readable-GMT-date": "string",
      "match-human-readable-GMT-time": "string",
      "match-GMT-date-time": "string"
    }, // ...
  ], // ...
}
```
Example:
```json
{
  "2023-03-08": [
    {
      "matchName": "South Africa vs West Indies, 2nd Test, Day 1",
      "country1": "South Africa",
      "country2": "West Indies",
      "url": "https://www.cricbuzz.com/live-cricket-scores/56192/rsa-vs-wi-2nd-test-day-1-west-indies-tour-of-south-africa-2023",
      "readableDate": "MAR 08 2023",
      "readableTime": "08:00 AM GMT / 10:00 AM LOCAL",
      "dateTime": "2023-03-08T08:00:00.000Z"
    },
    {
      "matchName": "Hong Kong vs Bahrain, 2nd Match",
      "country1": "Hong Kong",
      "country2": "Bahrain",
      "url": "https://www.cricbuzz.com/live-cricket-scores/66806/hk-vs-bhr-2nd-match-hong-kong-quadrangular-series-2023",
      "readableDate": "MAR 08 2023",
      "readableTime": "05:40 AM GMT / 01:40 PM LOCAL",
      "dateTime": "2023-03-08T05:40:00.000Z"
    },
    {
      "matchName": "New Zealand vs Sri Lanka, 1st Test, Day 1",
      "country1": "New Zealand",
      "country2": "Sri Lanka",
      "url": "https://www.cricbuzz.com/live-cricket-scores/49570/nz-vs-sl-1st-test-day-1-sri-lanka-tour-new-zealand-2023",
      "readableDate": "MAR 09 2023", // note that this date is overriden by "readableTime" to get slotted into March 8
      "readableTime": "10:00 PM GMT (Mar 08) / 11:00 AM LOCAL",
      "dateTime": "2023-03-08T22:00:00.000Z"
    }
  ]
}
```