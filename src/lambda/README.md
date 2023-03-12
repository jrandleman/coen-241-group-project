This folder contains shell scripts for automating lambda function scheduling and SNS topic creation and subscription. 

IMPORTANT UPDATES TO MAKE:
    1) Parse UTC date of game with interested team/player into format suitable for using croni
        CRON STRUCTURE: Minute Hour(time) Day(date number) 
        DESIRED STRUCTURE: */(minute range) StartTime-StartTime(+ some hours) Date(Day) Date(month) *
    2) Allow for configurable URL


Combined, this enables users to subscribe to a notification to follow a particular player, and then the Lambda function (scheduled to run several times during a game) will be able to notify them when their player is on strike.


Script Descriptions:

    lambda_sch.sh: Schedules the LivePlayerScraper Lambda function using EventBridge target from AWS command-line
        UPDATE: now also executes the same commands as topic_creation.sh, creating a topic/subscription for SNS and then scheduling the LivePlayerScraper. Also added more detailed cron expression for scheduling to specifically schedule it every $interval minutes from game start hour to end hour (based on $length estimated game time) on a specific date, month, and year (no risk of having it run a year later and notify the user)

OLD:
    topic_creation.sh: Creates a new topic and subscription for user with command-line arguments for user, player, and some id to create unique topic name
