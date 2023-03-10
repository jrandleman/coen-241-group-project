//////////////////////////////////////////////////////////////////////////////
// DETAILS
//////////////////////////////////////////////////////////////////////////////

/**
 * Core code for the lambda function to execute. Pass the cricket match URL you
 * want to parse as a query string parameter while performing a GET request:
 *   => https://22m1jusvp4.execute-api.us-east-1.amazonaws.com/default/LiveCricketPlayerScraperLambda?url=<CRICKET-MATCH-URL-HERE>
 */



//////////////////////////////////////////////////////////////////////////////
// IMPORTS
//////////////////////////////////////////////////////////////////////////////

const cheerio = require('cheerio');
const randomUseragent = require('random-useragent');
const axios = require('axios');
const rua = randomUseragent.getRandom();
const AWS = require('aws-sdk');
// const dynamo = new AWS.DynamoDB.DocumentClient();


//////////////////////////////////////////////////////////////////////////////
// ERROR MESSAGE GENERATION
//////////////////////////////////////////////////////////////////////////////

function errorMessage() {
    return {
        "title": "API URL is Missing or Data Not Found",
        "update": "Data Not Found",
        "current": "Data Not Found",
        "batsman": "Data Not Found",
        "batsmanrun": "Data Not Found",
        "ballsfaced": "Data Not Found",
        "fours": "Data Not Found",
        "sixes": "Data Not Found",
        "sr": "Data Not Found",
        "batsmantwo": "Data Not Found",
        "batsmantworun": "Data Not Found",
        "batsmantwoballsfaced": "Data Not Found",
        "batsmantwofours": "Data Not Found",
        "batsmantwosixes": "Data Not Found",
        "batsmantwosr": "Data Not Found",
        "bowler": "Data Not Found",
        "bowlerover": "Data Not Found",
        "bowlerruns": "Data Not Found",
        "bowlerwickets": "Data Not Found",
        "bowlermaiden": "Data Not Found",
        "bowlertwo": "Data Not Found",
        "bowletworover": "Data Not Found",
        "bowlertworuns": "Data Not Found",
        "bowlertwowickets": "Data Not Found",
        "bowlertwomaiden": "Data Not Found",
        "partnership": "Data Not Found",
        "recentballs": "Data Not Found",
        "lastwicket": "Data Not Found",
        "runrate": "Data Not Found",
        "commentary": "API URL is Missing or Data Not Found"
    };
}


//////////////////////////////////////////////////////////////////////////////
// PLAYER SCRAPING LOGIC
//////////////////////////////////////////////////////////////////////////////

async function getPlayerData(live_player_url) {
    const str = live_player_url || '';
    const live_url = str.replace('www', 'm');

    try {
        const response = await axios({method: 'GET', url: live_url, headers: { 'User-Agent': rua }});
        $ = cheerio.load(response.data);

        var title = $("h4.ui-header").text();
        var update = $("div.cbz-ui-status").text();
        var currentscore = $('span.ui-bat-team-scores').text();
        var batsman = $('span.bat-bowl-miniscore').eq(0).text().replace('*','');
        var batsmanrun = $('td[class="cbz-grid-table-fix "]').eq(6).text();
        var ballsfaced = $('span[style="font-weight:normal"]').eq(0).text();
        var fours = $('td[class="cbz-grid-table-fix "]').eq(7).text();
        var sixes = $('td[class="cbz-grid-table-fix "]').eq(8).text();
        var sr = $('td[class="cbz-grid-table-fix "]').eq(9).text();
        var batsmantwo = $('td[class="cbz-grid-table-fix "]').eq(10).text().replace('*','');
        var batsmantworun = $('td[class="cbz-grid-table-fix "]').eq(11).text();
        var batsmantwoballsfaced = $('span[style="font-weight:normal"]').eq(1).text();
        var batsmantwofours = $('td[class="cbz-grid-table-fix "]').eq(12).text();
        var batsmantwosixes = $('td[class="cbz-grid-table-fix "]').eq(16).text();
        var batsmantwosr = $('td[class="cbz-grid-table-fix "]').eq(14).text();
        var bowler = $('span.bat-bowl-miniscore').eq(2).text().replace('*','');;
        var bowlerover = $('td[class="cbz-grid-table-fix "]').eq(21).text();
        var bowlerruns = $('td[class="cbz-grid-table-fix "]').eq(23).text();
        var bowlerwickets = $('td[class="cbz-grid-table-fix "]').eq(24).text();
        var bowlermaiden = $('td[class="cbz-grid-table-fix "]').eq(22).text();
        var bowlertwo =  $('span.bat-bowl-miniscore').eq(3).text().replace('*','');;
        var bowletworover = $('td[class="cbz-grid-table-fix "]').eq(26).text();
        var bowlertworuns = $('td[class="cbz-grid-table-fix "]').eq(28).text();
        var bowlertwowickets = $('td[class="cbz-grid-table-fix "]').eq(29).text();
        var bowlertwomaiden = $('td[class="cbz-grid-table-fix "]').eq(27).text();
        var partnership = $("span[style='color:#333']").eq(0).text();
        var recentballs = $("span[style='color:#333']").eq(2).text();
        var lastwicket = $("span[style='color:#333']").eq(1).text();
        var runrate = $("span[class='crr']").eq(0).text();
        var commentary = $("p[class='commtext']").text();

        var livescore = ({
            title: title || "Data Not Found",
            update: update || "Data Not Found",
            current: currentscore || "Data Not Found",
            batsman: batsman || "Data Not Found",
            batsmanrun: batsmanrun || "Data Not Found",
            ballsfaced: ballsfaced || "Data Not Found",
            fours: fours || "Data Not Found",
            sixes: sixes || "Data Not Found",
            sr: sr || "Data Not Found",
            batsmantwo: batsmantwo || "Data Not Found",
            batsmantworun: batsmantworun || "Data Not Found",
            batsmantwoballsfaced: batsmantwoballsfaced || "Data Not Found",
            batsmantwofours: batsmantwofours || "Data Not Found",
            batsmantwosixes: batsmantwosixes || "Data Not Found",
            batsmantwosr: batsmantwosr || "Data Not Found",
            bowler: bowler || "Data Not Found",
            bowlerover: bowlerover || "Data Not Found",
            bowlerruns: bowlerruns || "Data Not Found",
            bowlerwickets: bowlerwickets || "Data Not Found",
            bowlermaiden: bowlermaiden || "Data Not Found",
            bowlertwo: bowlertwo || "Data Not Found",
            bowletworover: bowletworover || "Data Not Found",
            bowlertworuns: bowlertworuns || "Data Not Found",
            bowlertwowickets: bowlertwowickets || "Data Not Found",
            bowlertwomaiden: bowlertwomaiden || "Data Not Found",
            partnership: partnership || "Data Not Found",
            recentballs: recentballs || "Data Not Found",
            lastwicket: lastwicket || "Data Not Found",
            runrate: runrate || "Data Not Found",
            commentary: commentary || "Data Not Found"
        });

        console.log(JSON.stringify(livescore, null, 4));

        return livescore;
    } catch (error) {
        const err = errorMessage();
        console.error(err);
        return err;
    }
}


//////////////////////////////////////////////////////////////////////////////
// MODIFIED TEMPLATE FROM AWS
//////////////////////////////////////////////////////////////////////////////

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.httpMethod) {
            // case 'DELETE': {
            //     body = await dynamo.delete(JSON.parse(event.body)).promise();
            //     break;
            // }
            // case 'POST': {
            //     body = await dynamo.put(JSON.parse(event.body)).promise();
            //     break;
            // }
            // case 'PUT': {
            //     body = await dynamo.update(JSON.parse(event.body)).promise();
            //     break;
            // }
            case 'GET': {
                // body = await dynamo.scan({ TableName: event.queryStringParameters.TableName }).promise();

                body = await getPlayerData(event.queryStringParameters.url);
                break;
            }
            default: {
                throw new Error(`Unsupported method "${event.httpMethod}"`);
            }
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
