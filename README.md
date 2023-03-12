REQUIRED UPDATES:
	1) We can simply write the targets.json file with the Topic (for SNS), Player, and URL from the backend of the server (all the shell script does is echo the JSON format into a file). This means we do not need to generate the shell script with these hardcoded in. COMPLETE!
	2) We need to find the game of interest, translate the time into numbers that indicate the hour, day, month, and year. Then these will be passed as parameters as indicated in the shell script lambda_sch.sh.
	3) We need to have a method of generating unique rules/topics/statements from the backend. These will also be passed as parameters to the script, but they must be guaranteed (or all but guaranteed) to be unique because EventBridge will object otherwise and the event will not be scheduled. 
	4) We could also add a unique ID to the targets.json as to minimize spam messages to the user and only notify if the player has changed. (this is a potential stretch goal for using a Database with LivePlayerScraper lambda). UPDATE: unique id field updated but not actually randomly generated or used yet

# COEN 241 Cloud Computing Group Project


## Possible Scrapers to Use:
1. Potential NodeJS Scraper for [cricbuzz.com](https://www.cricbuzz.com): [linked here!](https://github.com/mskian/cricket-api-nodejs)
2. RSS Feed for Live Scores: [linked here!](https://static.cricinfo.com/rss/livescores.xml) (don't open in Safari!)