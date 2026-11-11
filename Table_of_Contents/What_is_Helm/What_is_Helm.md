# What is Helm

**What is Helm?**

Helm is the package manager for Kubernetes. Just as you use apt for Ubuntu, homebrew for macOS, or pip for Python, Helm simplifies the way you discover, share, install, and manage applications built for Kubernetes.

In the Kubernetes world, deploying a single application often requires managing multiple distinct YAML configuration files (Deployments, Services, ConfigMaps, Ingress, etc.). Helm bundles these scattered files into a single, cohesive package called a **Chart**.

------------------------------------------------------------------------

**Core Concepts of Helm**

To understand how Helm works, you only need to know three core concepts:

- **Charts:** A collection of files bundled into a directory that describes a related set of Kubernetes resources. Think of it as a reusable application blueprint or template.

- **Repositories:** A shared location where Helm charts can be stored, searched, and downloaded (similar to an App Store or Docker Hub). The central public hub is called the Artifact Hub.

- **Releases:** A specific, running instance of a chart deployed inside a Kubernetes cluster. You can install the same chart multiple times in the same cluster, and each installation creates a new, individually tracked release.

------------------------------------------------------------------------

**Why Use Helm?**

Helm solves several critical pain points for DevOps engineers and developers working with Kubernetes:

- **Dynamic Templating:** Instead of hardcoding values (like replica counts, domain names, or resource limits) into your YAML files, Helm allows you to use variables. You can inject different parameters for Development, Staging, and Production environments using a single chart.

- **Easy Rollbacks:** Helm tracks every deployment revision. If a new application update fails or introduces bugs, you can roll back to a previous operational state instantly with a single command (e.g., helm rollback).

- **Dependency Management:** If your application requires a database (like PostgreSQL) or a caching layer (like Redis), Helm can automatically pull, configure, and install those dependencies alongside your primary application.

- **One-Command Lifecycle:** You can install, upgrade, test, or delete complex multi-service applications using concise terminal commands rather than managing dozens of manual kubectl operations.

------------------------------------------------------------------------

**Basic Workflow Example**

Once Helm is installed, deploying a complex application like an Nginx web server reduces to a few quick commands:

```bash

# 1. Add the repository containing the official chart

helm repo add bitnami https://bitnami.com

# 2. Search for the package you need

helm search repo nginx

# 3. Install the chart to create a new release named "my-web-server"

helm install my-web-server bitnami/nginx

# 4. Safely upgrade the application when settings change

helm upgrade my-web-server bitnami/nginx --set replicaCount=3

```

**How using Helm with Kubernete**

Using **Helm with Kubernetes** follows a straightforward workflow: you write or download a template package (Chart), customize its parameters, and let Helm execute the deployment to your cluster via the Kubernetes API.

Here is a practical guide on how Helm interacts with Kubernetes and how to use them together.

------------------------------------------------------------------------

**🏛️ How Helm and Kubernetes Interact**

Helm operates as a client-side tool on your local machine or CI/CD runner. It communicates directly with your Kubernetes cluster using the **kubeconfig** file (~/.kube/config)—the same file used by kubectl.

1.  **The Template:** You provide a Helm Chart and a set of custom values.

2.  **The Render:** Helm compiles the templates locally into standard Kubernetes YAML manifests.

3.  **The Apply:** Helm sends these manifests to the Kubernetes API server, which creates the actual resources (Pods, Services, etc.).

------------------------------------------------------------------------

**🚀 Step-by-Step Guide to Using Helm**

**1. Verify Your Cluster Connection**

Before running Helm, make sure your terminal can talk to your Kubernetes cluster.

```bash

kubectl cluster-info

```

Use code with caution.

**2. Find and Add a Chart Repository**

Instead of writing manifests from scratch, you usually pull production-ready charts from public repositories (like Artifact Hub). Let's use the popular Bitnami repository as an example:

```bash

# Add the repository to your local Helm client

helm repo add bitnami https://bitnami.com

# Update your local cache to get the latest chart lists

helm repo update

```

**3. Customize and Install a Chart (Deploying to Kubernetes)**

When installing a chart, you give it a unique **Release Name** and target a specific **Namespace** in Kubernetes. You can also override default configurations using the --set flag.

```bash

# Install an Apache web server named "my-web-server" into the "default" namespace

helm install my-web-server bitnami/apache --set replicaCount=2

```

*Kubernetes Action:* Kubernetes immediately spins up 2 Apache pods and an associated cluster service.

**4. Track Your Deployments**

Helm keeps track of what is running inside your cluster independently of kubectl.

```bash

# List all active Helm releases

helm list

# List the actual Kubernetes pods generated by Helm

kubectl get pods

```

**5. Upgrade the Application (Day-2 Operations)**

If you need to change your application configuration (e.g., scale up resources or change an image version), use helm upgrade. Helm will perform a rolling update in Kubernetes.

```bash

# Scale the architecture from 2 replicas to 4 replicas

helm upgrade my-web-server bitnami/apache --set replicaCount=4

```

**6. Roll Back a Failed Deployment**

If an upgrade breaks your application, Helm stores previous versions as revisions inside Kubernetes secrets, allowing for instant rollbacks.

bash

# Roll back "my-web-server" to revision 1 (the original installation)

helm rollback my-web-server 1

**7. Clean Up**

To completely remove the application and all its associated Kubernetes resources:

```bash

helm uninstall my-web-server

```

------------------------------------------------------------------------

**🛠️ Using a values.yaml File for Production**

For real deployments, instead of using long --set flags in the terminal, you manage configurations using a dedicated file, typically named values.yaml.

1.  **Extract default values (Optional):**

```bash

helm show values bitnami/apache ```> my-values.yaml

2.  **Modify the file:** Open my-values.yaml and change your settings (e.g., changing port numbers or enabling persistent storage).

3.  **Deploy with the file:**

```bash

helm install my-web-server bitnami/apache -f my-values.yaml

```

# [README](./../../README.md)
