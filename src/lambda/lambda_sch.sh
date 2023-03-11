#Setup: aws configure with Key/Secret Key (can be created easily for IAM users or less securely for root users in "Security Credentials" under your username
#region: whatever region your event/lambda function will be in
#default output format (just click enter and it will be JSON by default)

#$1: rule name, $2: statement

#Command-line arguments are <user (email?)> <player> <date from DB> <URL from DB>
rule="testing" #need to have a unique rule/statement name for everything, but hardcoded for the test
statement="test3"

aws events put-rule --name $1 --schedule-expression "cron(0 23 * * ? *)" #this currently runs at 12:00 PST (want to have more dynamic and specific input to this for real usage)

aws lambda add-permission --function-name DBtester --statement-id $2 --action 'lambda:InvokeFunction' --principal events.amazonaws.com --source-arn arn:aws:events:us-west-1:392970261554:rule/$1
#note: for add-permission we need to change function-name to the actual player scraper, statement-id should be unique per rule, and the source-arn should be based on the user (my ID is 3929...)

#again, note that for the .json file we also want the target of rule to be the specific lambda function we want
#also, we need to figure out how to pass arguments to the lambda function using EventBridge
echo '[{"Id": "1","Arn": "arn:aws:lambda:us-west-1:392970261554:function:DBtester","Input":"{\"Team\": \"USA\",\"Player\":\"Test245\"}"}]' > targets.json

#with input:  '[{"Id": "1","Arn": "arn:aws:lambda:us-west-1:392970261554:function:tester","Input":"[{\"Stuff\": \"More Stuff\"}]"}]' 

aws events put-targets --rule $1 --targets file://targets.json

rm targets.json

