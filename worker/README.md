
To compress the file in zip
- Compress-Archive -Path * -DestinationPath function.zip

To upload in aws
aws lambda update-function-code --function-name video-processor --zip-file fileb://function.zip

--------
Flow :-

1. Upload video event to publish from S3 to SQS
2. SQS read input as lambda trigger
3. SQS run and write in the s3 object

IAM to take care
1. s3 object to have permission to write on SQS Queue
2. allowing S3 and Lambda to access your SQS queue
3. allowing your lambda to write in S3

Points to consider
1. Memory configuration for lambda
2. lambda function ffmpeg layer
3. sqs read match batch to 1