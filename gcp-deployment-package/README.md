# LinkedIn AI Agent - GCP Deployment Guide

## Prerequisites
- Google Cloud account with billing enabled
- Google Cloud SDK installed
- Project owner permissions

## Deployment Steps

1. **Set up your project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   gcloud services enable cloudbuild.googleapis.com run.googleapis.com
   ```

2. **Configure environment variables**:
   Edit `config/cloudbuild.yaml` with your project ID

3. **Run deployment script**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

4. **Configure n8n workflow**:
   - Import the workflow from `scripts/n8n-workflow-setup.txt`
   - Configure API keys for:
     - OpenAI
     - Tavily
     - LinkedIn

## Post-Deployment
- Monitor logs: `gcloud logging read "resource.type=cloud_run_revision"`
- View metrics in Cloud Console

## Troubleshooting
- Check build logs: `gcloud builds list`
- Redeploy if needed: `./scripts/deploy.sh`