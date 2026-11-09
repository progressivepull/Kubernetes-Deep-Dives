# To migrate your Docker Compose application to Kubernetes

To migrate your Docker Compose application to Kubernetes, you can convert your existing docker-compose.yml into Kubernetes manifests.

There are two main approaches:

1. **Kompose** – Automatically converts Docker Compose into Kubernetes YAML files.

2. **Manual migration** – Rewrite Compose services as Kubernetes Deployments, Services, ConfigMaps, Secrets, and PersistentVolumeClaims.

I recommend starting with Kompose, then reviewing and improving the generated manifests.

## 1. Example Docker Compose file
Suppose you have this docker-compose.yml:

```yaml
services:
  frontend:
    image: nginx:latest
    ports:
      - "8080:80"

  backend:
    image: my-backend:1.0
    ports:
      - "3000:3000"
    environment:
      DB_HOST: database

  database:
    image: postgres:16
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## 2. Install Kompose
Kompose converts Docker Compose files into Kubernetes resources.

Linux example:

```bash
curl -L https://github.com/kubernetes/kompose/releases/latest/download/kompose-linux-amd64 \
-o kompose

chmod +x kompose

sudo mv kompose /usr/local/bin/
```

Verify:

```bash
kompose version
```

## 3. Convert Docker Compose to Kubernetes
Navigate to the directory containing your Compose file:


```bash
kompose convert -f docker-compose.yml
```

This generates Kubernetes YAML files, typically including:

* Deployments
* Services
* PersistentVolumeClaims

You can also generate everything into one YAML:


```bash
kompose convert -f docker-compose.yml -o kubernetes.yaml
```

## 4. Deploy to Kubernetes
First, check your Kubernetes cluster:
```bash
kubectl get nodes
```
Apply the generated YAML:
```bash
kubectl apply -f kubernetes.yaml
```

Check deployments:
```bash
kubectl get deployments
```

Check services:
```bash
kubectl get services
```

Check pods:
```bash
kubectl get pods
```

# 5. Understand Docker Compose vs Kubernetes

| Docker Compose | Kubernetes | Description |
| --- | --- | --- |
| `services` | `Deployments` | Defines and manages application containers and workloads. |
| `ports` | `Services` | Exposes application ports and enables communication with workloads. |
| `volumes` | `PersistentVolumeClaims (PVCs)` | Provides persistent storage for application data. |
| `environment` | `ConfigMaps / Secrets` | Manages application configuration and sensitive environment variables. |
| `depends_on` | `Probes and application retries` | Handles application startup dependencies and readiness. |
| `restart` | `Pod restart policies` | Defines how containers or pods behave after failure or termination. |
| `networks` | `Services / NetworkPolicies` | Manages network connectivity, communication, and traffic restrictions. |
| `replicas` | `Deployment replicas` | Defines the number of application instances to run. |

# 6. Important things to fix after conversion
Kompose does not produce a production-ready Kubernetes architecture automatically.

Review these areas:

* **Database passwords:** Move passwords into Kubernetes Secrets.
* **Storage:** Configure PersistentVolumes and PersistentVolumeClaims.
* **Health checks:** Configure readiness and liveness probes.
* **Networking:** Configure ClusterIP, NodePort, or LoadBalancer appropriately.
* **Scaling:** Configure Deployment replicas.
* **Configuration:** Use ConfigMaps for non-sensitive configuration.
* **Dependencies:** Make applications retry connections instead of relying on depends_on.

# 7. Useful Kubernetes commands

```bash
# View all resources
kubectl get all

# View pods
kubectl get pods -o wide

# View logs
kubectl logs <pod-name>

# Describe pod
kubectl describe pod <pod-name>

# Scale application
kubectl scale deployment backend --replicas=3

# Delete deployment
kubectl delete deployment backend

```

Recommended migration workflow
Existing Docker Compose

docker-compose.yml

Convert using Kompose

kompose convert

Review Kubernetes YAML

Deployment, Service, Secret, ConfigMap, PVC

Deploy to Kubernetes

kubectl apply -f .

Validate and troubleshoot

kubectl get pods, kubectl logs

Production hardening

Ingress, autoscaling, monitoring, resource limits

Let me help you migrate your actual Compose application.
Do you have an existing docker-compose.yml?

You can upload it here, and I can convert it into a Kubernetes project with:

deployment.yaml

service.yaml

configmap.yaml

secret.yaml

pvc.yaml

ingress.yaml (if needed)

I'll also explain how each Docker Compose service maps to Kubernetes resources.




# Reference
* [Translate a Docker Compose File to Kubernetes Resources](https://kubernetes.io/docs/tasks/configure-pod-container/translate-compose-kubernetes/)

[README](./README.md)
