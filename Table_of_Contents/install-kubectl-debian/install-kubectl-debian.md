# How to Install kubectl on Debian Linux

The error:

```bash
john@debian:~/Downloads$ kubectl version --client
bash: kubectl: command not found
```

means Kubernetes command-line tool (`kubectl`) is not installed or is not available in your system's `PATH`.

Follow these steps to install it on Debian.

## Step 1. Update Debian

```bash
sudo apt update
sudo apt upgrade -y
```

## Step 2. Install required packages

```bash
sudo apt install -y ca-certificates curl gnupg
```

## Step 3. Add the Kubernetes repository key

Create the key directory:

```bash
sudo mkdir -p /etc/apt/keyrings
```

Download and install the Kubernetes signing key:

```bash
sudo curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.35/deb/Release.key \
  -o /etc/apt/keyrings/kubernetes-apt-keyring.asc
```

## Step 4. Add the Kubernetes repository

```bash
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.asc] https://pkgs.k8s.io/core:/stable:/v1.35/deb/ /' | \
sudo tee /etc/apt/sources.list.d/kubernetes.list
```

## Step 5. Install kubectl

```bash
sudo apt update
sudo apt install -y kubectl
```

## Step 6. Verify installation

```bash
kubectl version --client
```

You should see output similar to:

```text
Client Version: v1.35.x
Kustomize Version: v5.x.x
```

## Step 7. Check the kubectl location

```bash
which kubectl
```

Expected output:

```text
/usr/bin/kubectl
```

## Step 8. Enable Bash autocompletion (optional)

Install Bash completion:

```bash
sudo apt install -y bash-completion
```

Enable kubectl completion:

```bash
echo 'source <(kubectl completion bash)' >> ~/.bashrc
```

Reload your shell:

```bash
source ~/.bashrc
```

## Step 9. Test Kubernetes configuration

List configured contexts:

```bash
kubectl config get-contexts
```

Check cluster connectivity:

```bash
kubectl cluster-info
```

If you have not installed or configured a Kubernetes cluster yet, the connectivity command may report an error. That is expected: installing `kubectl` does not install a Kubernetes cluster.

## Installation summary

| Component | Purpose |
|---|---|
| `kubectl` | Kubernetes command-line client |
| Kustomize | Kubernetes configuration customization |
| Bash completion | Command autocomplete |
| kubeconfig | Kubernetes cluster connection settings |

## What to do next

To run Kubernetes locally, install a cluster such as **Kind** or **Minikube**. If Docker is already installed and working on your Debian VM, Kind is a good option.

Official Kubernetes installation documentation: https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/
