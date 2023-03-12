This folder contains shell scripts for automating lambda function scheduling and SNS topic creation and subscription. 

Combined, this enables users to subscribe to a notification to follow a particular player, and then the Lambda function (scheduled to run several times during a game) will be able to notify them when their player is on strike.


Script Descriptions:

    lambda_sch.sh: Schedules the LivePlayerScraper Lambda function using EventBridge target from AWS command-line
    topic_creation.sh: Creates a new topic and subscription for user with command-line arguments for user, player, and some id to create unique topic name 
