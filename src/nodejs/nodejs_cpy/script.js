function compareData() {
    // get input player data
    var player = document.getElementById("player").value;
    var country = document.getElementById("country").value;
  
    // create object to send to server
    var requestData = {
      player: player,
      country: country
    };
  
    // send POST request to server
    fetch('/compareData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (response.ok) {
        // get response from server
        return response.json();
      } else {
        throw new Error('Server response not ok');
      }
    })
    .then(data => {
      // handle the response from the server here
      if (data.playerFound) {
        if (data.countryMatch) {
          alert("Player and country match in the data!");
        } else {
          alert("Player found, but country does not match in the data!");
        }
      } else {
        alert("Player not found in the data!");
      }
      console.log(data);
    })
    .catch(error => {
      console.error(error);
      alert('API call failed!');
    });
  }
  