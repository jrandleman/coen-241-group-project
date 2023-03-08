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

   => UPDATE**2: TURNS OUT "GMT" AND "UTC" TIMES ARE IDENTICAL!

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
// HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////

// Whether have the "(Mar 8)" version of the 2 commented examples above the 
// helper functions below
function needsDateChange(matchReadableTime) {
  const gmtTime = matchReadableTime.split(' / ')[0];
  return gmtTime.split('(').length > 1;
}


// e.g. "10:00 PM GMT (Mar 08) / 11:00 AM LOCAL" (must adjust date)
function synthesizeDateTimeWithChange(matchDateString, matchReadableTime) {
  return (new Date(matchReadableTime.split(' / ')[0].replace('(',' ').replace(')',' ') + ' ' + matchDateString.split(' ')[2])).toJSON();
}


// e.g. "08:00 AM GMT / 10:00 AM LOCAL" (can just parse date directly)
function synthesizeDateTimeWithoutChange(matchDateString, matchReadableTime) {
  return (new Date(matchDateString + ' ' + matchReadableTime.split(' / ')[0])).toJSON();
}


// Convert time+date to a UTC 'new Date()' JSON style string
function getMatchDateTime(matchDateString, matchReadableTime) {
  if(needsDateChange(matchReadableTime)) {
    return synthesizeDateTimeWithChange(matchDateString,matchReadableTime);
  } else {
    return synthesizeDateTimeWithoutChange(matchDateString,matchReadableTime);
  }
}


function convertParsedDataToDatabaseEntries(parsedData) {
  const dbEntries = {};
  for(const entry of parsedData) {
    const key = entry.dateTime.split('T')[0];
    if(dbEntries[key] == undefined) {
      dbEntries[key] = [];
    }
    dbEntries[key].push(entry);
  }
  return dbEntries;
}


//////////////////////////////////////////////////////////////////////////////
// CHEERIO OBJECT PARSING LOGIC
//////////////////////////////////////////////////////////////////////////////

// Simple thrupple wrapper
class CricketMatch {
  constructor(name, url, matchDateString, readableTime, dateTime) {
    const nameSections = name.split(' vs ');
    this.matchName = name;
    this.country1 = nameSections[0];
    this.country2 = nameSections[1].split(',')[0];
    this.url = url;
    this.readableDate = matchDateString;
    this.readableTime = readableTime;
    this.dateTime = dateTime;
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
          const matchReadableTime = $(ref).text().trim();
          const matchDateTime = getMatchDateTime(matchDateString,matchReadableTime);
          parsedData.push(new CricketMatch(matchName, matchUrl, matchDateString, matchReadableTime, matchDateTime));
        }
      });
    }
  });
}


// Returns an object: {'date': [<CricketMatch-object>, ...], ...}
function parseData($) {
  const parsedData = [];
  const matchDayRows = $(`#${INTERNATIONAL_SCHEDULE_TABLE_ID} > div`);
  matchDayRows.each((idx,ref) => {
    let matchDateString = null;
    const matchDayEntries = $(ref);
    matchDayEntries.children().each((idx,ref) => {
      // Save the date
      if(idx == 0) {
        matchDateString = $(ref).text().split(',')[1].trim();
      // Parse the live match(es) on said date
      } else {
        parseMatchDayContents($,parsedData,matchDateString,ref);
      }
    });
  });
  return convertParsedDataToDatabaseEntries(parsedData);
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