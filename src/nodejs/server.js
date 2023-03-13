const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const fetch = require('node-fetch');
const execSync = require('child_process').execSync;

// Returns <null> if no match with the team is found
function getClosestMatchWithTeam(teamName, schedule) {
  // Lowercase all team names
  const canonicalize = s => s.toLowerCase().trim();
  teamName = canonicalize(teamName);
  // Parse all matches with the team name
  const matches = [];
  for(const key of Object.keys(schedule)) {
    for(const match of schedule[key]) {
      console.log(match)
      if(canonicalize(match["country1"]) == teamName || canonicalize(match["country2"]) == teamName) {
        matches.push(match);
      }
    }
  }
  if(matches.length == 0) return null;
  // Get the closest match 
  matches.sort((e1, e2) => (new Date(e1['dateTime'])) - (new Date(e2['dateTime'])));
  const closestMatch = matches[0];
  // Parse out the closest match's contents
  const matchDate = new Date(closestMatch['dateTime']);
  return {
    'url': closestMatch['url'],
    'year': matchDate.getUTCFullYear(),
    'month': matchDate.getUTCMonth()+1,
    'day': matchDate.getUTCDate(),
    'hour': matchDate.getUTCHours(),
    'minute': matchDate.getUTCMinutes()
  };
}


app.use(express.static(__dirname));
app.use(express.json());

app.post('/compareData', (req, res) => {
  const player = req.body.player;
  const country = req.body.country;
  const email=req.body.email;
///////////////////////////////
// For checking against data.json file
  // // read player data from data.json
  // fs.readFile('data.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Internal server error' });
  //     return;
  //   }

  //   // parse data from  JSON
  //   const jsonData = JSON.parse(data);

  //   // Check if the player exists in the data
  //   const playerData = jsonData.players.find(p => p.player === player);
  //   if (!playerData) {
  //     res.json({ playerFound: false });
  //     return;
  //   }

    // Check if the country matches
    ////////////////////////////////////
  res.json({ playerFound: true, countryMatch: true });
  console.log(player,country,email);
  fetch('https://98azzq6cyd.execute-api.us-east-1.amazonaws.com/default/schedulescraper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playername : player,
        countryname : country
      })
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // handle the response from the Lambda function here
      console.log(data);
      //TO DO: CHECK THAT THIS IS THE CORRECT RESPONSE TO NULL JSON (NO MATCH WITH TEAM NAME)
      const closestMatch=getClosestMatchWithTeam(country,data);
      console.log(closestMatch);
      if (closestMatch == null) {
        console.error(`No Match in Schedule for Team: ${country}`);
        return;
      }
      //alert('API call successful!');
      ///////////////////////////////
      // figuring out exec processes 
      exec('find . -type f | wc -l', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
      
        console.log(`Number of files ${stdout}`);
      });
      ///////////////////////////////
      // Run the script and send data to stdin
      const hi = "Hi from script file ----"
      console.log("We actually are trying to start the script, but I don't know what you're doing.")
      //ALL VARIABLES BELOW WITHOUT SPECIFIC COMMENTS MUST BE PARSED FROM SCHEDULER SCRAPER RETURN JSON
      const URL=closestMatch['url'];
      //const email =email //FOR TEST PURPOSES ONLY!!!
      //// siena's details
      // const ID="392970261554"
      // const function_name="LivePlayerScraper"
      // const region="us-west-1"
      //// rahul's details
      const ID="808645845014"
      const function_name="snsfinal2"
      const region="us-east-1"
      const ARN="arn:aws:lambda:" + region + ":" + ID + ":function:" + function_name //THIS CAN STAY IF SAME PERSON RUNS SERVER (SIENA)(NO NEED TO GET FROM JSON FILE)
      const safeEmail=email.replace("@","-").replace(".","-")
      const topic=safeEmail + (new Date().getTime() + "") //THIS WILL BE RANDOMLY-ISH GENERATED (MUST HAVE HUMAN_REASONABLE NAME THOUGH)
      //PLAYER FROM USER INPUT
      const uniqueID=safeEmail + player.replace(/ /g,"") //THIS WILL BE UNIQUELY GENERATED (WITH HASH?)
      const childtest = exec(`echo '[{"Id": "1","Arn": "${ARN}","Input":"{\\\"Topic\\\": \\\"${topic}\\\",\\\"Player\\\":\\\"${player}\\\",\\\"Country\\\": \\\"${country}\\\",\\\"URL\\\":\\\"${URL}\\\",\\\"ID\\\":\\\"${uniqueID}\\\"}"}]' > targets.json`,(error, stdout, stderr) => {
        if (error) {
          console.error(`Error creating json: ${error}`);
          return;
        }
        //console.log(`Script output: ${stdout}`);
      });
      childtest.stdin.end();
      //VARIABLES IN THIS SECTION WILL ALSO NEED TO BE PARSED FROM THE UTC TIME IF NOT HAVING A SPECIFIC COMMENT
      //const statement="superUnique9" //UNIQUELY GENERATED
      const minute=closestMatch['minute']
      const hour=closestMatch['hour']
      const day=closestMatch['day']
      const month=closestMatch['month']
      const year=closestMatch['year']
      const statement=(new Date().getTime() + "") + safeEmail
      console.log(topic)
      //EMAIL FROM USER INPUT
      //const email="shanna@scu.edu" //FROM USER INPUT
      const scheduleStuff=exec(`sh scheduler.sh \"${topic}\" \"${statement}\" ${minute} ${hour} ${day} ${month} ${year} ${email}`,(error,stdout,stderr) => {
      if (error) {
          console.error(`Error running scheduler.sh: ${error}`);
          return;
        }
      });
      scheduleStuff.stdin.end();
      
      //const output = execSync('ls', { encoding: 'utf-8' });  // the default is 'buffer'
      //console.log('Output was:', output); // we got data.json

      const child = exec(`sh myscript.sh ${hi}`,(error, stdout, stderr) => {
        if (error) {
          console.error(`Error running script: ${error}`);
          return;
        }
        console.log(`Script output: ${stdout}`);
      });

      child.stdin.write(JSON.stringify(data));
      child.stdin.end();
      })
    .catch(error => {
      console.error(error);
      //alert('API call failed!');
    });

  });

//});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
