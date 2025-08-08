
To compress the file in zip
- Compress-Archive -Path * -DestinationPath function.zip

To upload in aws
aws lambda update-function-code --function-name video-processor --zip-file fileb://function.zip
