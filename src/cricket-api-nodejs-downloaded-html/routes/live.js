const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const randomUseragent = require('random-useragent');
const apicache = require("apicache");
const axios = require('axios');
const { rateLimit } = require('express-rate-limit');
const rua = randomUseragent.getRandom();
const cache = apicache.middleware
const matchdata = require('../utlis/app.json');
const { dummydata } = require('../utlis/error.js');
const { errormsg } = require('../utlis/msg.js');

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json(
          dummydata()
        )
    }
})

router.get('/', cache('2 minutes'), apiRequestLimiter, function(req, res) {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('Content-Type', 'application/json');

    let str = matchdata.match_url;
    let live_url = str.replace('www', 'm');

    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function(response) {

        $ = cheerio.load(response.data);

        const matchIsOngoing = $("div.cb-text-complete").length == 0;
        const [batsman, batsmantwo] = $("a[ng-bind=\"batsmen.batName\"]").map(function(){ return $(this).text() }).get();
        const [bowler, bowlertwo] = $("a[ng-bind=\"bowler.bowlName\"]").map(function(){ return $(this).text() }).get();

        var livescore = ({
            batsman: (matchIsOngoing && batsman) || "Data Not Found",
            batsmantwo: (matchIsOngoing && batsmantwo) || "Data Not Found",
            bowler: (matchIsOngoing && bowler) || "Data Not Found",
            bowlertwo: (matchIsOngoing && bowlertwo) || "Data Not Found"
        });

        console.log(JSON.stringify(livescore, null, 4));

        res.send(JSON.stringify(livescore, null, 4));

    }).catch(function(error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            console.log('Something Went Wrong - Enter the Correct API URL');
            res.json(errormsg());
        }
    });

});

module.exports = router;