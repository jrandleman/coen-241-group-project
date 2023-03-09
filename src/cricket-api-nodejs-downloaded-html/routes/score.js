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

    const match_url = req.query.url;

    let str = match_url || '';
    let live_url = str.replace('www', 'm');

    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function(response) {

        $ = cheerio.load(response.data);

        const [batter1, batter2] = $("a[ng-bind=\"batsmen.batName\"]").map(function(){ return $(this).text() }).get();
        const [bowler1, bowler2] = $("a[ng-bind=\"bowler.bowlName\"]").map(function(){ return $(this).text() }).get();
        console.log(`batter1 = ${batter1}`);
        console.log(`batter2 = ${batter2}`);
        console.log(`bowler1 = ${bowler1}`);
        console.log(`bowler2 = ${bowler2}`);

        var livescore = ({
            batter1: batter1 || "Data Not Found",
            batter2: batter2 || "Data Not Found",
            bowler1: bowler1 || "Data Not Found",
            bowler2: bowler2 || "Data Not Found"
        });

        res.send(JSON.stringify(livescore, null, 4));

    }).catch(function(error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            res.json(errormsg());
        }
    });

});

module.exports = router;