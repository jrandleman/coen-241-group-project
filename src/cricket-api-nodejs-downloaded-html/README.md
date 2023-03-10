# Found GitHub Code Equivalent to Parse Live Player Data (only to be used during the Monday presentation)

## Execution: `node index.js`
* This will return a JSON object holding the live player data in the form:
  ```json
  {
       "batsman": "Travis Head",
       "batsmantwo": "Usman Khawaja",
       "bowler": "Umesh Yadav",
       "bowlertwo": "Mohammed Shami"
   }
  ```

## Notes:
* Uncomment `// $ = cheerio.load(GAME_OVER_HTML);` in the code to instead parse "finished game" state data.


## When integrating with a lambda function:
* Have the lambda function email the user that their favorite player has been found IFF their favorite player is in any of the above JSON fields.




<!-- ====== OLD README ======
# ALTERED TO WORK ON A DOWNLOADED HTML PAGE HOLDING LIVE PLAYER DATA

Works with the HTML pages in: 
1. `coen-241-group-project/downloaded-html/jordan/batter.html`
2. `coen-241-group-project/downloaded-html/jordan/batter_done.html`

Instructions to execute:
1. Rename `batter.html` (or `batter_done.html` to test scraping finished game) from the above path file to be `index.html`
2. Run `php -S localhost:8080` in the local directory where you have `index.html`
   * Make sure you have `php` installed on the system!
   * This will host the downloaded html page on `http://localhost:8080`
3. Go to `coen-241-group-project/src/cricket-api-nodejs-downloaded-html`
4. Run `node index.js`
5. In your browser, go to `http://localhost:3000/score?url=http://localhost:8080`
   * The webpage will display JSON with both batter and bowler names (but only if the game is ongoing)!
     - If the game already ended (e.g. `batter_done.html` is being parsed), each player name JSON entry will just be `"Data Not Found"`


# Free Cricket API 🏏  

[![Github Workflow](https://github.com/mskian/cricket-api-nodejs/workflows/server-test/badge.svg)](https://github.com/mskian/cricket-api-nodejs/actions)  

Node.js Version - Get Live Cricket Score data from `Cricbuzz.com`  

This is an unofficial API and not Linked or Partnered with Any Brands/Company.  

## How it Works? 🤔

Build using Node.js and cheerio.js - using cheerio for Scrape the data and Converted in JSON API with the Help of Express Server.

Everything is scraped live and shown to end users in realtime.  

**API URL**

- Live Match Data - `http://localhost:3000/live`
- Get Live data from the URL - `http://localhost:3000/score?url=<Live Match URL>`  

**Note**

API Caching, CORS and API Rate limit Was Enabled by default you can update the settings accoding to your usage - Files are Located in `/routes/` folder  

## Requirements 📑

- Server With Latest LTS Node.JS Support and Nginx (For Self Host)
- HTTPS for Secure SSL Connection

(OR)

- use Vercel or Heroku Free Cloud Hosting

## Installation and Development 📥

- Download the Clone the Repo

```sh
git clone https://github.com/mskian/cricket-api-nodejs.git
cd cricket-api-nodejs
```

- install Node Modules via `yarn`

```sh
yarn
```

- Test Locally

```sh
yarn dev
```

- Production

```sh
yarn start
```

## Usage 🍟

- Get the Live Match Score URL from - `https://www.cricbuzz.com/cricket-match/live-scores`
- Enter them Directly or replace `www` with `m`

### Example 📋

```sh
http://localhost:3000/score?url=https://www.cricbuzz.com/live-cricket-scores/30524/53rd-match-indian-premier-league-2020
```

(OR)

- Update the Match URL on `/utlis/app.json` File

```sh
http://localhost:3000/live
```

## Free Hosting 😍

- Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmskian%2Fcricket-api-nodejs)  

## Contributing 🙌

Your PR's are Welcome

## Disclaimer 🗃

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purpose only - use at your own risk on Production Site

All Credits Goes to <https://www.cricbuzz.com/>

## My other Projects 🤓

| # | Project Name | Description |
|---|:------|-------------|
| 01 | [Cricket API - PHP Version](https://github.com/mskian/cricket-api/) | Live Cricket Score API PHP Version - Scrape using PHP `preg_match` and `preg_math_all` |
| 02 | [Live Cricket Score Static Site](https://github.com/mskian/livescore) | A Simple Scrape Method - Fetch the Live Cricket Score from `espncricinfo.com` using Nodejs and Cheerio.js |
| 03 | [IPL Special](https://github.com/mskian/iplscore) | Cricket API for Get the Live IPL Cricket Score |
| 04 | [Live IPL Score Update on Telegram](https://github.com/mskian/score-update) | Get Live IPL cricket Score on Telegram  |
| 05 | [Live Cricket Score Wordpress Plugin (JS Version)](https://github.com/mskian/hello-cricket) | Get Live Cricket Score on Wordpress site call API using Javascript Fetch API |
| 06 | [Live Cricket Score Wordpress Plugin (Wp Remote URL)](https://github.com/mskian/san-cricket) | Get Live Cricket Score on Wordpress site call API using Wordpress HTTP Remote URL |  
| 07 | [PWA Web App](https://github.com/mskian/vue-cricket) | Real-time Live Cricket Score Web app + PWA Built using Nuxt.js |  

## LICENSE 📕

MIT
 -->