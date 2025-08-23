# Worker Lambda Function

This directory contains the AWS Lambda function responsible for processing video files (e.g., transcoding, thumbnail generation) in the E2E Video Streaming Platform. The function is triggered by SQS events published from S3 uploads.

---

## Usage

### 1. Compress the Lambda Code
```powershell
Compress-Archive -Path * -DestinationPath function.zip
```

### 2. Deploy/Update Lambda in AWS
```sh
aws lambda update-function-code --function-name video-processor --zip-file fileb://function.zip
```

---

## Architecture & Flow

1. User uploads a video to S3 (original bucket).
2. S3 event triggers a message to SQS.
3. Lambda is triggered by SQS, processes the video (e.g., using FFmpeg), and writes the output back to S3.

### IAM Permissions
- S3 must have permission to write to SQS.
- SQS and Lambda must have correct access policies.
- Lambda must have permission to read/write S3 objects.

### Lambda Configuration
- Ensure sufficient memory and timeout for video processing.
- Attach the FFmpeg Lambda Layer for video operations.
- Set SQS batch size to 1 for event-driven processing.

---

## Troubleshooting & Tips
- Check CloudWatch logs for errors.
- Ensure all environment variables (bucket names, etc.) are set.
- Test with small video files before scaling up.

---

## References
- [AWS Lambda Docs](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS SQS Docs](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [AWS S3 Event Notifications](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html)
- [FFmpeg Lambda Layer Example](https://github.com/serverlesspub/ffmpeg-aws-lambda-layer)