#Setup: aws configure with Key/Secret Key (can be created easily for IAM users or less securely for root users in "Security Credentials" under your username
#	region: whatever region your event/lambda function will be in
#	default output format (just click enter and it will be JSON by default)


#interval: how often to run (minutes) in a game, length: length of the game (hours)
interval=5
length=3



#Command Line Arguments: sh lambda_sch.sh <rule name> <statement name> <game start hour> <game start date (day number)> <game start month (number)> <player> <email>
rule=$1
statement=$2
day=$4
month=$5
hour=$3
year=$8
end=$(($hour + $length))
player=$6
email=$7

#$6: player, $7: email

#This creates a topic with a name the same as the events rule
aws sns create-topic --name $rule

#This creates a subscription to the topic that was just created with the user's email.
aws sns subscribe --topic-arn arn:aws:sns:us-west-1:392970261554:$rule --protocol email --notification-endpoint $email


#This creates a new event with $rule name scheduled to run every $interval minutes from the start hour for game length on the specified date
aws events put-rule --name $rule --schedule-expression "cron(*/$interval $hour-$end $day $month ? $year)"

#This adds permission for the event to run the LivePlayerScraper
aws lambda add-permission --function-name LivePlayerScraper --statement-id $statement --action 'lambda:InvokeFunction' --principal events.amazonaws.com --source-arn arn:aws:events:us-west-1:392970261554:rule/$rule

#This creates the target file for assigning the LivePlayerScraper Lambda Function as the target of this scheduled event.
#Note: we need a way to have myTopic, myPlayer, and the URL all be variables that differ per user, not hardcoded
echo '[{"Id": "1","Arn": "arn:aws:lambda:us-west-1:392970261554:function:LivePlayerScraper","Input":"{\"Topic\": \"myTopic\",\"Player\":\"myPlayer\",\"URL\":\"https://www.cricbuzz.com/live-cricket-scores/60028/ind-vs-aus-4th-test-day-4-australia-tour-of-india-2023\"}"}]' > targets.json

aws events put-targets --rule $rule --targets file://targets.json

rm targets.json

