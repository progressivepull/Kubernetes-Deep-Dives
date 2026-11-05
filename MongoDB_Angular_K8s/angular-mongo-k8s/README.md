# Angular + Express + MongoDB with Docker and Kubernetes

A working example of an Angular frontend, Node.js Express API, and MongoDB database.

## Requirements
- Docker with Docker Compose
- For Kubernetes: kubectl and kind (or another cluster with a default StorageClass)

## Local: Docker Compose

```bash
docker compose up --build -d
docker compose ps
```

Open http://localhost:8080 and add/delete items.

```bash
docker compose logs -f backend
docker compose down
```

`docker compose down -v` also deletes the MongoDB volume and all stored data.

## Kubernetes with kind

From the project root:

```bash
kind create cluster --name angular-mongo
docker build -t angular-mongo-backend:1.0 ./backend
docker build -t angular-mongo-frontend:1.0 ./frontend
kind load docker-image angular-mongo-backend:1.0 angular-mongo-frontend:1.0 --name angular-mongo
kubectl apply -f k8s/all.yaml
kubectl -n angular-mongo rollout status statefulset/mongo --timeout=180s
kubectl -n angular-mongo rollout status deployment/backend --timeout=180s
kubectl -n angular-mongo rollout status deployment/frontend --timeout=180s
kubectl -n angular-mongo get pods,svc,pvc
kubectl -n angular-mongo port-forward service/frontend 8080:80
```

Open http://localhost:8080. Keep the port-forward command running while testing.

### Troubleshooting

```bash
kubectl -n angular-mongo describe pod -l app=backend
kubectl -n angular-mongo logs deployment/backend
kubectl -n angular-mongo logs statefulset/mongo
kubectl -n angular-mongo get pvc
```

### Cleanup

```bash
kind delete cluster --name angular-mongo
```

## Notes
- This is a **local development demo**, not a production security baseline. Replace the hard-coded example MongoDB credentials and Kubernetes Secret with secure credential management before using a shared cluster.
- The Kubernetes MongoDB StatefulSet requires a default StorageClass. Most kind clusters provide one.
- The Nginx config proxies `/api/` to the backend Kubernetes Service or Docker Compose service named `backend`.
- For remote Kubernetes clusters, push both images to an accessible container registry and update the image names in `k8s/all.yaml`.
- MongoDB uses a single instance for simplicity; production databases need backups, monitoring, and high availability.
