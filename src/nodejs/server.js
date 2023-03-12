const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const fetch = require('node-fetch');
const execSync = require('child_process').execSync;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/compareData', (req, res) => {
  const player = req.body.player;
  const country = req.body.country;

  // read player data from data.json
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // parse data from JSON
    const jsonData = JSON.parse(data);

    // Check if the player exists in the data
    const playerData = jsonData.players.find(p => p.player === player);
    if (!playerData) {
      res.json({ playerFound: false });
      return;
    }

    // Check if the country matches
    if (playerData.country === country) {
      res.json({ playerFound: true, countryMatch: true });
      console.log(player,country);
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
	  //ALL VARIABLES BELOW WITHOUT SPECIFIC COMMENTS MUST BE PARSED FROM SCHEDULER SCRAPER RETURN JSON
          const URL="https://www.cricbuzz.com/live-cricket-score/60028/ind-vs-aus-4th-test-day-4-australia-tour-of-india-2023"
          const ARN="arn:aws:lambda:us-west-1:392970261554:function:LivePlayerScraper" //THIS CAN STAY (NO NEED TO GET FROM JSON FILE)
          const topic="ServerPowerTest1" //THIS WILL BE RANDOMLY-ISH GENERATED (MUST HAVE HUMAN_REASONABLE NAME THOUGH)
          const player="Virat Kohli" //FROM USER INPUT
          const uniqueID="random stuff" //THIS WILL BE UNIQUELY GENERATED (WITH HASH?)
          const childtest = exec(`echo '[{"Id": "1","Arn": "${ARN}","Input":"{\\\"Topic\\\": \\\"${topic}\\\",\\\"Player\\\":\\\"${player}\\\",\\\"URL\\\":\\\"${URL}\\\",\\\"ID\\\":\\\"${uniqueID}\\\"}"}]' > targets.json`,(error, stdout, stderr) => {
            if (error) {
              console.error(`Error creating json: ${error}`);
              return;
            }
            //console.log(`Script output: ${stdout}`);
          });
          childtest.stdin.end();
          //VARIABLES IN THIS SECTION WILL ALSO NEED TO BE PARSED FROM THE UTC TIME IF NOT HAVING A SPECIFIC COMMENT
          const statement="superUnique1"
          const hour=6
          const day=12
          const month=3
          const year=2023
          const email="shanna@scu.edu" //FROM USER INPUT
          const scheduleStuff=exec(`sh scheduler.sh ${topic} ${statement} ${hour} ${day} ${month} ${year} ${player} ${email}`,(error,stdout,stderr) => {
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
    } else {
      res.json({ playerFound: true, countryMatch: false });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
