#!/bin/bash

# Set project ID
PROJECT_ID="your-project-id"

# Build and push Docker image
gcloud builds submit --config config/cloudbuild.yaml --project=$PROJECT_ID

# Deploy to Cloud Run
SERVICE_NAME="linkedin-ai-agent"
REGION="us-central1"

gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated

echo "Deployment complete! Service URL:"
gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'