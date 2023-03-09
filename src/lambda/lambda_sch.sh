#Command-line arguments are <user (email?)> <player> <date from DB> <URL from DB>

aws events put-rule \
--name $1$2$3 \
--schedule-expression "cron( * * ? *)"

aws lambda add-permission \
--function-name tester \
--statement-id my-scheduled-event \
--action 'lambda:InvokeFunction' \
--principal events.amazonaws.com \
--source-arn arn:aws:events:us-west-1:392970261554:rule/$1$2$3

#create specific targets.json for this specific rule

echo "[{\"Id\": \"1\",\n\"Arn\": \"arn:aws:lambda:us-west-1:392970261554:function:tester\"\n}]" > targets.json

aws events put-targets --rule $1$2$3 --targets file://targets.json

rm targets.json


#note: replace region, userID (mine is 392970261554), and function with appropriate functions

