#!/bin/bash
# This script will build the react app and upload it to aws S3 (static website hosting, cheaper than ECS)

npm run build
aws s3 sync ./build s3://lolpowerrankings.click --delete