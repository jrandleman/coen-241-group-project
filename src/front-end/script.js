function compareData() {
  // get input player data
  var player = document.getElementById("player").value;
  var country = document.getElementById("country").value;
  // read player data from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Check if the player exists in the data
      var playerData = data.players.find(p => p.player === player);
      if (!playerData) {
        alert("Player not found in the data!");
        return;
      }

      // Check if the country matches
      if (playerData.country === country) {
        alert("Player and country match in the data!");
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
            alert('API call successful!');
          })
          .catch(error => {
            console.error(error);
            alert('API call failed!');
          });
      } else {
        alert("Player found, but country does not match in the data!");
      }
    })
    .catch(error => console.error(error));
}
