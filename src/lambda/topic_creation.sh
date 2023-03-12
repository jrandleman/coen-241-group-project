#$1: player, $2: email, $3: id of some sort (HASH??)

aws sns create-topic --name $1$3


#change arn as appropriate (and ID, as this is my (Siena's)
aws sns subscribe --topic-arn arn:aws:sns:us-west-1:392970261554:$1$3 --protocol email --notification-endpoint $2


