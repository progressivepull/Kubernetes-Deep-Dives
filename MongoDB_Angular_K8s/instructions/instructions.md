# instructions

**Docker and Kubernetes Project: Angular + MongoDB**

We'll build a complete example using Angular, Node.js, MongoDB, Docker, and Kubernetes.

Angular will provide the frontend, Node.js/Express will provide the REST API, and MongoDB will store the data.

**1. Application architecture**

The project will support two deployment methods:

- Docker Compose: Run Angular, the API, and MongoDB locally.

- Kubernetes: Deploy the same application as Deployments, Services, a MongoDB StatefulSet, and persistent storage.

The sample application will allow you to add, view, and delete records stored in MongoDB.

**2. Complete project files**

I've created the project with the Angular application, Express REST API, MongoDB configuration, Dockerfiles, Docker Compose, Kubernetes YAML, and setup instructions.

Download the complete Angular + MongoDB Docker/Kubernetes project

The project structure is:

angular-mongo-k8s/

├── frontend/

│ ├── Dockerfile

│ ├── nginx.conf

│ ├── package.json

│ ├── angular.json

│ ├── tsconfig.json

│ └── src/

│ ├── main.ts

│ ├── index.html

│ ├── styles.css

│ └── app/

│ └── app.component.ts

├── backend/

│ ├── Dockerfile

│ ├── package.json

│ └── server.js

├── k8s/

│ └── all.yaml

├── docker-compose.yml

└── README.md

**3. Run with Docker Compose**

Open a terminal inside the extracted project directory.


```bash
docker compose up --build -d
```

Check the containers:

```bash
docker compose ps
```

Open your browser at:

[http://localhost:8080](http://localhost:8080)

You can add items, retrieve them from MongoDB, and delete them.

**4. Run with Kubernetes**

The example uses kind to create a local Kubernetes cluster.

Create the cluster:

```bash
kind create cluster --name angular-mongo
```

Build both application images:

```bash
docker build -t angular-mongo-backend:1.0 ./backend

docker build -t angular-mongo-frontend:1.0 ./frontend
```

Load the images into Kubernetes:


```bash
kind load docker-image \\

angular-mongo-backend:1.0 \\

angular-mongo-frontend:1.0 \\

--name angular-mongo
```

Deploy all Kubernetes resources:

```bash
kubectl apply -f k8s/all.yaml
```

Check the Pods:

```bash
kubectl get pods -n angular-mongo
```

Wait for the frontend and backend Deployments to become ready, then expose the frontend locally:

```bash
kubectl port-forward \\

-n angular-mongo \\

service/frontend 8080:80
```

Open \*\*http://localhost:8080\*\*.

**5. How the application communicates**

| **Application** | **Docker/Kubernetes name** | **Port** |
|-----------------|----------------------------|----------|
| Angular         | frontend                   | 80       |
| Node.js API     | backend                    | 3000     |
| MongoDB         | mongo                      | 27017    |

The Angular application calls /api/items. Nginx forwards these requests to the Node.js backend, which reads and writes MongoDB records.

Important: This is a local development example. It uses demonstration database credentials, which must be replaced before production deployment. The files have been generated, but I couldn't execute Docker or Kubernetes here to verify the running application.

# [README](./../../../README.md)
