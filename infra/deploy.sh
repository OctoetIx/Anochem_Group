#!/bin/bash
set -e

# Directory of your infra/docker-compose
APP_DIR="/root/myapp/infra"

# Git commit SHA
GIT_SHA=$(git rev-parse --short HEAD)

# Docker image tags
CLEAN_USER="$(echo "${DOCKERHUB_USER}" | tr -d '[:space:]')"
BACKEND_TAG="${CLEAN_USER}/myapp-backend:${GIT_SHA}"
FRONTEND_TAG="${CLEAN_USER}/myapp-frontend:${GIT_SHA}"

cd "$APP_DIR"

# Update image tags in .env
sed -i '/^BACKEND_TAG=/d' .env
sed -i '/^FRONTEND_TAG=/d' .env
echo "BACKEND_TAG=$BACKEND_TAG" >> .env
echo "FRONTEND_TAG=$FRONTEND_TAG" >> .env

# Pull latest images
docker compose pull

# Restart containers
docker compose up -d --remove-orphans

# Function for health check
check_health() {
  local name=$1
  local url=$2
  local retries=12
  local wait=5

  echo "Checking $name health..."
  for i in $(seq 1 $retries); do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    if [ "$status" = "200" ]; then
      echo "$name is up!"
      return 0
    fi
    echo "Waiting for $name... ($i/$retries)"
    sleep $wait
  done

  echo "$name failed to start!"
  return 1
}

# Run health checks
check_health "Backend" "http://localhost:2000/api/test"
check_health "Frontend" "http://localhost"

echo "Deployment complete!"