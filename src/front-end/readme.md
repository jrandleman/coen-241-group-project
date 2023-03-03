# Front End 
This is basic setup of front end of the App logic which consists of a basic HTML form, which takes in input from the USER in the form of two fields, player name and country.
As the USER hits submit button two functions are called.
1. Which checks the user input against a predefined data.json player database file.
2. calls an API Gateway which triggers the hosted aws lambda function, and then spins out the web scraper output in JSON format.
Note : I left out the link for the api, as this is a public repository.