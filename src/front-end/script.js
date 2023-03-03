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
      } else {
        alert("Player found, but country does not match in the data!");
      }
    })
    .catch(error => console.error(error));
}

function makeApiCall() {
      axios.get('https://nwcbl6ia43.execute-api.us-east-1.amazonaws.com/default/cricketMatches/pleaseremovethisbeforerunning')
.then((response) => {
  console.log(response.data);
  alert('API call successful!');
})
.catch((error) => {
  console.error(error);
  alert('API call failed!');
});

    }

