# Docker Hub: Push and Pull Instructions

Docker Hub is a cloud-based repository for storing and sharing Docker images. You can upload (push) images to Docker Hub and download (pull) images from Docker Hub.

## 1. Log in to Docker Hub

Log in using your Docker Hub username:

```bash
docker login
```

Example:

```text
Authenticating with existing credentials...
Login Succeeded
```

If you need to log in using a different account:

```bash
docker logout
docker login
```

## 2. View Local Docker Images

Before pushing an image, check which images are available locally:

```bash
docker images
```

Example:

```text
REPOSITORY                    TAG       IMAGE ID
my-angular-app-angular-app    latest    abc123
```

## 3. Tag an Image for Docker Hub

Docker Hub images use this naming format:

```text
DOCKERHUB_USERNAME/REPOSITORY:TAG
```

Tag a local image:

```bash
docker tag my-angular-app-angular-app:latest progressivepull/my-angular-app:v1.0
```

Verify the new tag:

```bash
docker images
```

Example:

```text
REPOSITORY                       TAG       IMAGE ID
progressivepull/my-angular-app   v1.0      abc123
```

## 4. Push an Image to Docker Hub

Upload the tagged image:

```bash
docker push progressivepull/my-angular-app:v1.0
```

To push a `latest` tag, first create it:

```bash
docker tag my-angular-app-angular-app:latest progressivepull/my-angular-app:latest
```

Then push it:

```bash
docker push progressivepull/my-angular-app:latest
```

## 5. Pull an Image from Docker Hub

Download an image:

```bash
docker pull progressivepull/my-angular-app:v1.0
```

Download the latest tag:

```bash
docker pull progressivepull/my-angular-app:latest
```

You can also pull official images without a Docker Hub username:

```bash
docker pull node:alpine
docker pull nginx:latest
```

## 6. Run a Pulled Image

For an Angular app served by Nginx, map host port 8080 to container port 80:

```bash
docker run -d -p 8080:80 --name my-angular-container progressivepull/my-angular-app:v1.0
```

Open this address in your browser:

```text
http://localhost:8080
```

Check running containers:

```bash
docker ps
```

Stop the container:

```bash
docker stop my-angular-container
```

Start it again:

```bash
docker start my-angular-container
```

Remove the container:

```bash
docker rm -f my-angular-container
```

## 7. Complete Push Workflow

```bash
# Log in
docker login

# View local images
docker images

# Tag the local image for Docker Hub
docker tag my-angular-app-angular-app:latest progressivepull/my-angular-app:v1.0

# Upload to Docker Hub
docker push progressivepull/my-angular-app:v1.0
```

## 8. Complete Pull Workflow

```bash
# Log in (if the image is private)
docker login

# Download the image
docker pull progressivepull/my-angular-app:v1.0

# Verify the image
docker images

# Run the container
docker run -d -p 8080:80 --name my-angular-container progressivepull/my-angular-app:v1.0
```

## 9. Common Docker Commands

| Command | Description |
|---|---|
| `docker login` | Log in to Docker Hub |
| `docker logout` | Log out of Docker Hub |
| `docker images` | List local images |
| `docker tag` | Tag an image |
| `docker push` | Upload an image |
| `docker pull` | Download an image |
| `docker image ls` | List images |
| `docker image rm IMAGE` | Remove a local image |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker search nginx` | Search for images |

## 10. Troubleshooting

### Denied: requested access to the resource is denied

Check that:
- You are logged in: `docker login`
- The image name includes your Docker Hub username.
- You have permission to push to the repository.
- The repository exists in Docker Hub, or Docker Hub allows it to be created by your push.

### Image not found locally

Check the local image name and tag:

```bash
docker images
```

Use the exact repository and tag when running `docker tag` or `docker push`.

### Port is already in use

Choose a different host port. For example:

```bash
docker run -d -p 8081:80 --name my-angular-container progressivepull/my-angular-app:v1.0
```

Then visit:

```text
http://localhost:8081
```

## Quick Reference

- **Push:** Upload an image from your computer to Docker Hub.
- **Pull:** Download an image from Docker Hub to your computer.
- **Tag:** Assign a repository name and version to an image.
- **Image:** A packaged application and its dependencies.
- **Container:** A running (or stopped) instance of an image.

# [README](./../../README.md)
