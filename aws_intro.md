<!-- Update AWS - Learning the ropes progress -->
GETTING STARTED

AWS Free Tier Account signup is fairly straightforward (though you do have to provide billing information). Apparently, you should be automatically notified once you have used 85% of the (usually monthly) service. I WOULD HIGHLY RECOMMEND WE ALL SIGN UP ASAP SO THAT WE CAN GET A MONTHLY RESET BEFORE DUE DATE (JUST IN CASE). 

However, to be safe, you can also go to <Your Username>->Billing Dashboard->Menu->Budgets and create a budget based on a template, and Zero-Spend Budget is one of the 4 automatically available templates, which will tell you if you spend literally any money at all (so that you can shut whatever is trying to eat your money down ASAP).
  
You can also change what Region of services you are using (where the physical infrastructure is). I changed mine from Oregon to N California. 
  
MAIN RELEVANT SERVICES:

EC2 ("Virtual Servers in the Cloud"): Image Builder is probably the main service we will want to use. Please note that building image pipelines appears to be vaguely equivalent to using a Dockerfile--it lets you choose the configuratrions for images, but running it builds an image rather than actually running your code. 
 
 You can "create your own recipe" which can be an Amazon Machine Image (AMI) or Docker image. For the former, you can choose Amazon Linux, Windows, Ubuntu, CentOS, RHEL, or SUSE Linux. I chose Amazon Linux bc Linux, RHEL, and SUSE were the ones that were listed as free on AWS Free Trial information. Then, you choose the image origin (I did Quick start (Amazon-managed) because I do not have images created by me or shared with me). I Amazon Linux 2 x86, and I chose "latest" rather than "selected" or "specified".

Working directory can be specifically defined or left as /tmp. I had to choose at least one "build compontents," which I believe are automatically-installed cloud softwares (ex: aws-cli-version-2-linux), so I chose mariadb-linux (idk if we want to use a SQL database but it's an option and I needed to pick one). I did not select any tests. I used the defaults for the rest of image creation.

Then, it appeared in "Image Pipelines" in the EC2 Image Builder Dashboard, so I selected it, went to "Actions" and used "Run pipeline." I believe this does not actually run the image itself, rather it is building the image like as if you were using a Dockerfile. The image now appears under "Images" in the EC2 Image Builder and its status is "...Building".
