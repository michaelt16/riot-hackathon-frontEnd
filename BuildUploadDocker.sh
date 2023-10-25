#!/bin/bash
# This script will build the Docker image and upload it to aws ECR
npm run build
docker build -t riot-hackathon-frontend .
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/m4w6d1r1
docker tag riot-hackathon-frontend:latest public.ecr.aws/m4w6d1r1/riot-hackathon-frontend:latest
docker push public.ecr.aws/m4w6d1r1/riot-hackathon-frontend:latest