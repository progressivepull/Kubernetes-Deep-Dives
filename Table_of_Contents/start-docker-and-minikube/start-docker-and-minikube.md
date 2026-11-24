# How to Start Docker Engine and Minikube

**Verified instructions** based on official documentation from Docker and Minikube (as of November 2026).

These steps assume Docker and Minikube are already **installed**. If not, install them first:
- Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Minikube: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

---

## 1. Start Docker Engine

Docker Engine (the daemon) must be running before you can use Minikube with the Docker driver (the most common and recommended setup).

### Linux (systemd – Ubuntu, Debian, Fedora, CentOS, RHEL, etc.)

```bash
# Start Docker
sudo systemctl start docker

# (Optional) Enable Docker to start automatically on boot
sudo systemctl enable docker

# Verify Docker is running
sudo systemctl status docker
# or
docker info
```

**Expected result**: Status shows `Active: active (running)`.

### macOS / Windows (Docker Desktop)

1. Open **Docker Desktop** from Applications (macOS) or the Start menu (Windows).
2. Wait until the Docker whale icon in the menu bar / system tray is steady (not animating).
3. Verify:

```bash
docker version
docker run hello-world
```

### Manual start (Linux only – advanced)

```bash
sudo dockerd
```

(Press `Ctrl+C` to stop.)

---

## 2. Start Minikube

Once Docker is running, start a local Kubernetes cluster with Minikube.

### Basic start (recommended)

```bash
minikube start
```

Minikube will automatically detect and use the Docker driver if Docker is available.

### Explicitly use Docker driver

```bash
minikube start --driver=docker
```

### Make Docker the default driver (optional)

```bash
minikube config set driver docker
```

### Useful start options

```bash
# Allocate more resources
minikube start --cpus=4 --memory=8192

# Specific Kubernetes version
minikube start --kubernetes-version=v1.31.0

# Multiple nodes
minikube start --nodes=2
```

### Verify the cluster

```bash
minikube status
kubectl get nodes
kubectl get pods -A
```

**Expected output for `minikube status`**:
```
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

---

## 3. Useful Commands After Starting

| Action                    | Command                          |
|---------------------------|----------------------------------|
| Open Kubernetes Dashboard | `minikube dashboard`            |
| Stop the cluster          | `minikube stop`                 |
| Delete the cluster        | `minikube delete`               |
| Delete all clusters       | `minikube delete --all`         |
| View cluster IP           | `minikube ip`                   |
| SSH into the node         | `minikube ssh`                  |

---

## 4. Troubleshooting Tips

- **Docker not running**: Minikube will fail with a driver error. Start Docker first.
- **Permission denied on Linux**: Add your user to the `docker` group:
  ```bash
  sudo usermod -aG docker $USER
  # Then log out and log back in
  ```
- **Insufficient resources**: Increase CPUs/memory with `--cpus` and `--memory`.
- **WSL2 on Windows**: Ensure Docker Desktop is set to use the WSL 2 backend.
- Official troubleshooting: [Minikube Troubleshooting](https://minikube.sigs.k8s.io/docs/handbook/troubleshooting/)

---

## Official Sources

- Docker daemon start: [https://docs.docker.com/engine/daemon/start/](https://docs.docker.com/engine/daemon/start/)
- Minikube start guide: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
- Minikube Docker driver: [https://minikube.sigs.k8s.io/docs/drivers/docker/](https://minikube.sigs.k8s.io/docs/drivers/docker/)
- Basic controls: [https://minikube.sigs.k8s.io/docs/handbook/controls/](https://minikube.sigs.k8s.io/docs/handbook/controls/)

---

*Document generated with verified official documentation references.*

# [README](./../../README.md)
