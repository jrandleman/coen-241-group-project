#Setup: aws configure with Key/Secret Key (can be created easily for IAM users or less securely for root users in "Security Credentials" under your username
#	region: whatever region your event/lambda function will be in
#	default output format (just click enter and it will be JSON by default)


#interval: how often to run (minutes) in a game, length: length of the game (hours)
interval=5
length=3
#siena's details
#ID="392970261554"
#function_name="LivePlayerScraper"
#region="us-west-1"

# Rahul's details
ID="808645845014"
function_name="secondscraper-bashone"
region="us-east-1"


rule=$1
statement=$2
minute=$3
hour=$4
day=$5
month=$6
year=$7
end=$(($hour + $length))
email=$8

#This creates a topic with a name the same as the events rule
aws sns create-topic --name $rule > schedulerlog.txt

#This creates a subscription to the topic that was just created with the user's email.
aws sns subscribe --topic-arn arn:aws:sns:$region:$ID:$rule --protocol email --notification-endpoint $email >> schedulerlog.txt

echo "$rule $statement $minute $hour $day $month $year $email" > emailcheck

#This creates a new event with $rule name scheduled to run every $interval minutes from the start hour for game length on the specified date
aws events put-rule --name $rule --schedule-expression "cron($minute/$interval $hour-$end $day $month ? $year)" >> schedulerlog.txt

#This adds permission for the event to run the LivePlayerScraper
aws lambda add-permission --function-name $function_name --statement-id $statement --action 'lambda:InvokeFunction' --principal events.amazonaws.com --source-arn arn:aws:events:$region:$ID:rule/$rule >> schedulerlog.txt

#This creates the target file for assigning the LivePlayerScraper Lambda Function as the target of this scheduled event.
#Note: we need a way to have myTopic, myPlayer, and the URL all be variables that differ per user, not hardcoded
#echo '[{"Id": "1","Arn": "arn:aws:lambda:us-west-1:392970261554:function:LivePlayerScraper","Input":"{\"Topic\": \"myTopic\",\"Player\":\"myPlayer\",\"URL\":\"https://www.cricbuzz.com/live-cricket-scores/60028/ind-vs-aus-4th-test-day-4-australia-tour-of-india-2023\",\"ID\":\"TestID\"}"}]' > targets.json

aws events put-targets --rule $rule --targets file://targets.json >> schedulerlog.txt

#rm targets.json


