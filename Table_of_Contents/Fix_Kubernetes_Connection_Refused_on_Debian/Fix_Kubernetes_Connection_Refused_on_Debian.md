# Fix Kubernetes Connection Refused on Debian

**Fix Kubernetes Connection Refused on Debian**

**Install and Configure Minikube with Docker**

**Operating System:** Debian Linux\
**Linux User:** john\
**Project:** angular-k8s\
**Kubernetes:** Minikube\
**Container Runtime:** Docker Engine

**1. Problem Description**

When running the following command:

kubectl get nodes -o wide lists all worker and control-plane machines in your Kubernetes cluster along with extended networking and system details.

```bash
kubectl get nodes -o wide
```

You receive this error:

```

E1122 memcache.go:265] "Unhandled Error"

err="couldn't get current server API group list:

Get "http://localhost:8080/api?timeout=32s":

dial tcp [::1]:8080: connect: connection refused

The connection to the server localhost:8080 was refused

- did you specify the right host or port?

```

**Why does this happen?**

The **kubectl** command-line utility is installed, but it cannot connect to a Kubernetes API server.

Common reasons include:

1.  Kubernetes cluster has not been installed.

2.  Kubernetes cluster is not running.

3.  Kubernetes configuration (kubeconfig) is missing or incorrect.

4.  No valid Kubernetes context is configured.

**Solution:** Install Minikube and use Docker as the Kubernetes driver.

**2. Verify Docker Installation**

First, check whether Docker is installed:

```bash
docker --version
```

Check Docker Compose:

```bash
docker compose version
```

Check Docker service:

```bash
sudo systemctl status docker
```

If Docker is not running:

```bash
sudo systemctl start docker

sudo systemctl enable docker
```

Verify Docker:

```bash
docker ps
```

If you receive a permission-denied error, add your Linux user to the Docker group:

```bash
sudo usermod -aG docker john
```

Log out and log back in for the group membership to take effect.

Verify:

```bash
groups
docker ps
```

**Important:** Membership in the Docker group grants root-equivalent privileges.

**3. Verify System Architecture**

Minikube's Debian package below is for 64-bit x86 systems.

Check your architecture:

```bash
dpkg --print-architecture
```

Expected output:

```
amd64
```

Update Debian:

```bash
sudo apt update

sudo apt upgrade -y
```

Install curl:

```bash
sudo apt install -y curl ca-certificates
```

**4. Install Minikube**

Download the latest Minikube Debian package:

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
```

Install Minikube:

```bash
sudo dpkg -i minikube_latest_amd64.deb
```

Verify installation:

```bash
minikube version
```

Example:

```
minikube version: vX.Y.Z
```

**5. Verify kubectl Installation**

Check the Kubernetes client:

```bash
kubectl version --client
```

Check its executable location:

```bash
which kubectl
```

If kubectl is not installed, install it using the official Kubernetes installation instructions:

[<u>https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/</u>](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

**6. Start Kubernetes Using Minikube**

**Important:** Run these commands as your regular Linux user john, not as root.

Start Minikube using Docker:

```bash
minikube start --driver=docker
```

This command:

1.  Creates a local Kubernetes cluster.

2.  Uses Docker to run the Kubernetes node.

3.  Configures the Kubernetes API server.

4.  Configures your kubectl context.

5.  Starts the Kubernetes control plane.

The initial startup may take several minutes because Minikube needs to download container images.

Check Minikube status:

```bash
minikube status
```

Expected output:

```
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

```

**7. Verify Kubernetes Nodes**

Run:

```bash
kubectl get nodes -o wide
```

Expected output (version and addresses will vary):

NAME STATUS ROLES AGE VERSION

```
minikube Ready control-plane 2m v1.xx.x
```

The important value is:

```
STATUS: Ready
```

This confirms Kubernetes is running and kubectl can communicate with the cluster.

**8. Check Kubernetes Pods**

List all pods across every namespace:

```bash
kubectl get pods -A
```

Check system pods:

```bash
kubectl get pods -n kube-system
```

Check Kubernetes services:

```bash
kubectl get services -A
```

**9. Check Kubernetes Cluster Information**

Run:

```bash
kubectl cluster-info
```

Example:

Kubernetes control plane is running at:

https://192.168.x.x:8443

CoreDNS is running at:

https://192.168.x.x:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

Check the current Kubernetes context:

```bash
kubectl config current-context
```

Expected:

```
minikube
```

List available contexts:

```bash
kubectl config get-contexts
```

**10. Check Kubernetes Version**

Check the client version:

```bash
kubectl version --client
```

Check client and server versions:

```bash
kubectl version
```

Check Minikube version:

```bash
minikube version
```

**11. Useful Minikube Commands**

| **Command**           | **Description**           |
|-----------------------|---------------------------|
| minikube start        | Start Kubernetes          |
| minikube stop         | Stop Kubernetes           |
| minikube status       | Check cluster status      |
| minikube delete       | Delete Kubernetes cluster |
| minikube dashboard    | Open Kubernetes dashboard |
| minikube ip           | Display cluster IP        |
| minikube logs         | Display Minikube logs     |
| minikube update-check | Check for updates         |

**12. Troubleshooting**

**Problem: Docker permission denied**

permission denied while trying to connect to the Docker daemon socket

Solution:

```bash
sudo usermod -aG docker john
```

Log out and back in, then run:

```bash
docker ps
```

**Problem: Kubernetes API connection refused**

The connection to the server localhost:8080 was refused

Check Minikube:

```bash
minikube status
```

If stopped:

```bash
minikube start --driver=docker
```

Check the current context:

```bash
kubectl config current-context
```

If necessary:

```bash
minikube update-context
```

Then retry:

```bash
kubectl get nodes
```

**Problem: Minikube cannot start**

Check Docker:

```bash
sudo systemctl status docker
```

Check Docker containers:

```bash
docker ps -a
```

Review Minikube logs:

```bash
minikube logs
```

**13. Final Verification Checklist**

Run these commands in order:

```bash
# 1. Check Docker
docker --version

# 2. Check Docker Compose
docker compose version

# 3. Check Minikube
minikube version

# 4. Check kubectl
kubectl version --client

# 5. Check Minikube status
minikube status

# 6. Check Kubernetes context
kubectl config current-context

# 7. Check Kubernetes nodes
kubectl get nodes -o wide

# 8. Check Kubernetes pods
kubectl get pods -A

# 9. Check cluster information
kubectl cluster-info

```

**14. Next Step: Deploy Angular Application**

Once Kubernetes reports that your node is Ready, you can begin deploying your Angular application.

Your project directory:

```bash
cd ~/GitHub/angular-k8s/my-angular-app
```

Check your project files:

```bash
ls -la
```

Build your Docker image (use the image name and tag required by your project):

```bash
docker build -t my-angular-app:latest .
```

Make the image available to Minikube:

minikube image load my-angular-app:latest

You can then create Kubernetes deployment and service YAML files to deploy your Angular application.

**Official Documentation**

- Minikube: [<u>https://minikube.sigs.k8s.io/docs/</u>](https://minikube.sigs.k8s.io/docs/)

- Kubernetes: [<u>https://kubernetes.io/docs/home/</u>](https://kubernetes.io/docs/home/)

- kubectl: [<u>https://kubernetes.io/docs/reference/kubectl/</u>](https://kubernetes.io/docs/reference/kubectl/)

- Docker: [<u>https://docs.docker.com/engine/install/debian/</u>](https://docs.docker.com/engine/install/debian/)

**Final result:** Debian + Docker + Minikube + kubectl = A working local Kubernetes development environment.

# [README](./../../README.md)
