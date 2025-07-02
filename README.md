# LinkedIn AI Agent - Deployment Guide

This guide provides instructions for deploying the LinkedIn AI Agent application both locally and on Google Cloud Platform.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Production Deployment](#production-deployment)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Google Cloud SDK](https://cloud.google.com/sdk) (for GCP deployment)
- [n8n](https://n8n.io/) (for workflow automation)

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/linkedin-ai-agent.git
   cd linkedin-ai-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. Start the development environment:
   ```bash
   docker-compose up
   ```

5. Access the application at:
   ```
   http://localhost:8080
   ```

## Production Deployment

### Google Cloud Platform (GCP)

1. Set up your GCP project:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

2. Enable required services:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   ```

3. Build and deploy:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

4. Access your deployed application:
   ```bash
   gcloud run services describe linkedin-ai-agent --platform managed
   ```

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Application Configuration
PORT=8080
NODE_ENV=production

# API Keys
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# n8n Configuration
N8N_BASE_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

## Troubleshooting

### Common Issues

1. **Docker container fails to start**
   - Ensure Docker is running
   - Check available ports
   - Run `docker system prune` to clean up unused resources

2. **API keys not working**
   - Verify API keys are correct
   - Check API quotas
   - Ensure proper environment variable setup

3. **Cloud Run deployment fails**
   - Check Cloud Build logs
   - Verify IAM permissions
   - Ensure sufficient project quota

## Additional Resources

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [n8n Documentation](https://docs.n8n.io/)
- [Docker Documentation](https://docs.docker.com/)