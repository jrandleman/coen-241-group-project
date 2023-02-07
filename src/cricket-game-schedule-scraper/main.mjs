// Author: Jordan Randleman







//////////////////////////////////////////////////////////////////////////////
// -:- QUESTIONS ABOUT CRICBUZZ WE NEED ANSWERED -:-
//////////////////////////////////////////////////////////////////////////////

/*

1. ARE THE DATES LISTED IN UTC TIME, THE LOCAL TIMEZONE OF THE BROWSER, THE LOCAL TIMEZONE OF THE MATCH, ETC. 
   => LOCAL TIMEZONE OF THE BROOAWSER MAY CAUSE ISSUES IF WE SPAWN THIS CODE FROM AN AWS SERVER IN AN UNDETERMINATE TIMEZONE
      * WOULD HAVE TO CONVERT ALL TIMES TO UTC (ULTIMATELY THIS IS LIKELY THE WISEST MOVE)

   => UPDATE: LOOKS LIKE SITE TIMES ARE RELATIVE TO THE BROWSER, BUT MAY BE ABLE TO CIRCUMVENT SUCH BY USING THE GMT TIME THEY ALWAYS SEEMS TO LIST TOO
      * NOTE: ACCOUNT FOR SUCH BY ASSERTING THE "GMT" PREFIX IS PRESENT WHEN PARSING THE DATE, ELSE THROW AN ERROR
      * NOTE: BIG DATE NAMES ON TOP OF ROW SEEM TO INDICIATE DATE IN GMT, WHICH PAIRS NICELY WITH THE GMT TIME DESIGNATION
        - MAY WANT TO MENTION THIS "GMT" TIMEZONE IN THE "PARSED OBJECTS" OBJECT RETURNED BY THIS CODE!

*/






//////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////

// This import style is required by 'node-fetch' & mandates this file must 
// have the ".mjs" extension. Why does <node> require that? 🤷
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';


//////////////////////////////////////////////////////////////////////////////
// CONSTANTS 
//////////////////////////////////////////////////////////////////////////////

const CRICBUZZ_INTERNATIONAL_SCHEDULE_URL = 'https://www.cricbuzz.com/cricket-schedule/upcoming-series/international';

// From "inspect element" 😎
const INTERNATIONAL_SCHEDULE_TABLE_ID = 'international-list';


//////////////////////////////////////////////////////////////////////////////
// CHEERIO OBJECT PARSING LOGIC
//////////////////////////////////////////////////////////////////////////////

// Simple thrupple wrapper
class CricketMatch {
  constructor(name, url, time) {
    this.name = name;
    this.url = url;
    this.time = time;
  }
};


// Parse the match day instance
function parseMatchDayContents($, parsedData, matchDateString, ref) {
  const matchDayEntryData = $(ref);
  matchDayEntryData.children().each((idx,ref) => {
    // ignore the intial cell, only contains the tour name/url (which we don't use)
    if(idx > 0) {
      let matchUrl = null;
      let matchName = null;
      const matchSeriesData = $(ref);
      matchSeriesData.children().each((idx,ref) => {
        if(idx % 2 == 0) {
          const matchLink = $(ref).find('a');
          matchName = matchLink.text();
          matchUrl = `https://www.cricbuzz.com${matchLink.attr('href')}`;
        } else {
          const matchTime = $(ref).text().trim();
          parsedData[matchDateString].push(new CricketMatch(matchName, matchUrl, matchTime));
        }
      });
    }
  });
}


// Returns an object: {'date': [<CricketMatch-object>, ...], ...}
function parseData($) {
  const parsedData = {};
  const matchDayRows = $(`#${INTERNATIONAL_SCHEDULE_TABLE_ID} > div`);
  matchDayRows.each((idx,ref) => {
    let matchDateString = null;
    const matchDayEntries = $(ref);
    matchDayEntries.children().each((idx,ref) => {
      // Save the date
      if(idx == 0) {
        matchDateString = $(ref).text();
        parsedData[matchDateString] = [];
      // Parse the live match(es) on said date
      } else {
        parseMatchDayContents($,parsedData,matchDateString,ref);
      }
    });
  });
  return parsedData;
}


//////////////////////////////////////////////////////////////////////////////
// MAIN EXECUTION
//////////////////////////////////////////////////////////////////////////////

async function main() {
  try {
    const response = await fetch(CRICBUZZ_INTERNATIONAL_SCHEDULE_URL);
    const html = await response.text();
    const results = parseData(cheerio.load(html));
    console.log(JSON.stringify(results,null,2));
  } catch(err) {
    console.error(`Couldn't parse cricbuzz! Error: ${err}`);
    return;
  }
}


main();