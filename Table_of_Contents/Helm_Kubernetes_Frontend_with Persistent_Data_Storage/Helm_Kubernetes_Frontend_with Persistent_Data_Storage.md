# Helm Kubernetes Frontend with Persistent Data Storage

**Helm Kubernetes: Angular + MongoDB with Persistent Data Storage**

You can use **Helm** to deploy an Angular application and MongoDB together in Kubernetes. MongoDB will use a **PersistentVolumeClaim (PVC)** so your database files survive Pod restarts and replacements.

The recommended architecture has three components:

1.  **Angular frontend** — Displays the website.

2.  **Node.js/Express backend** — Provides an API that communicates with MongoDB.

3.  **MongoDB database** — Stores application data using persistent Kubernetes storage.

Angular should communicate with MongoDB through the backend API, not connect directly to the database.

1.  **Kubernetes architecture**

<img src="Helm_Kubernetes_Frontend_with Persistent_Data_Storage_media/media/image1.png" style="width:4.17383in;height:4.86136in" />

**2. Recommended project file structure**

**Here is a complete Helm project structure for Angular, Node.js, and MongoDB.**

**angular-mongo-project/**

<img src="Helm_Kubernetes_Frontend_with Persistent_Data_Storage_media/media/image2.png" style="width:6.5in;height:3.56736in" />

**What each Kubernetes YAML file does**

| **File** | **Purpose** |
|----|----|
| frontend-deployment.yaml | Runs Angular containers |
| frontend-service.yaml | Exposes Angular inside Kubernetes |
| backend-deployment.yaml | Runs Node.js API containers |
| backend-service.yaml | Makes the API accessible |
| mongodb-statefulset.yaml | Runs MongoDB with stable storage |
| mongodb-service.yaml | Provides MongoDB internal DNS |
| mongodb-secret.yaml | Supplies MongoDB credentials |
| ingress.yaml | Routes external requests to Angular and the API |
| values.yaml | Centralizes image names, ports, and storage settings |
| Chart.yaml | Defines the Helm chart |

**3. Helm configuration files**

**Chart.yaml**

This file defines your Helm chart.

```yaml

apiVersion: v2
name: angular-mongo
description: Angular, Node.js API, and MongoDB
type: application
version: 0.1.0
appVersion: "1.0.0"


```



**values.yaml**

This file controls your Angular, backend, and MongoDB settings.

```yaml

frontend:
  replicaCount: 2
  image:
    repository: myrepo/angular-app
    tag: "1.0"
  service:
    port: 80

backend:
  replicaCount: 2
  image:
    repository: myrepo/node-api
    tag: "1.0"
  service:
    port: 3000

mongodb:
  image: mongo:8.0
  database: angularapp
  storage:
    size: 10Gi
    storageClassName: standard
  auth:
    existingSecret: mongodb-auth


```


Replace the image repositories with your actual container image locations. The standard StorageClass must exist in your cluster; check with kubectl get storageclass.

**4. MongoDB persistent storage**

This is the most important part for storing your MongoDB data.

**mongodb-statefulset.yaml**

A StatefulSet is preferable to a Deployment for MongoDB because it supports stable Pod identity and persistent storage.

```yaml

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb
  replicas: 1

  selector:
    matchLabels:
      app: mongodb

  template:
    metadata:
      labels:
        app: mongodb

    spec:
      containers:
        - name: mongodb
          image: {{ .Values.mongodb.image }}

          ports:
            - containerPort: 27017

          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: {{ .Values.mongodb.auth.existingSecret }}
                  key: username

            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ .Values.mongodb.auth.existingSecret }}
                  key: password

          volumeMounts:
            - name: mongo-storage
              mountPath: /data/db

  volumeClaimTemplates:
    - metadata:
        name: mongo-storage

      spec:
        accessModes:
          - ReadWriteOnce

        storageClassName: {{ .Values.mongodb.storage.storageClassName | quote }}

        resources:
          requests:
            storage: {{ .Values.mongodb.storage.size }}


```

**Important:** volumeClaimTemplates automatically creates a PVC for the MongoDB StatefulSet. You do not need a separate mongodb-pvc.yaml in this design.

**mongodb-service.yaml**

```yaml

apiVersion: v1
kind: Service
metadata:
  name: mongodb
spec:
  clusterIP: None

  selector:
    app: mongodb

  ports:
    - port: 27017
      targetPort: 27017


```

The Node.js backend can access MongoDB using the internal Kubernetes DNS name mongodb when both are in the same namespace.

MongoDB data storage

<img src="Helm_Kubernetes_Frontend_with Persistent_Data_Storage_media/media/image3.png" style="width:6.04892in;height:1.21534in" />

MongoDB writes database files to /data/db, which is mounted from persistent storage.

| **Event** | **MongoDB data** |
|----|----|
| MongoDB container restarts | Preserved |
| MongoDB Pod replaced | Preserved if volume can be reattached |
| Helm upgrade | Normally preserved |
| Helm uninstall | PVC is normally retained for StatefulSet claims |
| PVC deleted | Data may be deleted, depending on PV reclaim policy |

Persistent storage does not replace backups. For production, also configure backups, recovery, and appropriate MongoDB replication.

**5. Angular and Node.js Kubernetes deployments**

**frontend-deployment.yaml**

```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: angular
spec:
  replicas: {{ .Values.frontend.replicaCount }}

  selector:
    matchLabels:
      app: angular

  template:
    metadata:
      labels:
        app: angular

    spec:
      containers:
        - name: angular
          image: "{{ .Values.frontend.image.repository }}:{{ .Values.frontend.image.tag }}"

          ports:
            - containerPort: 80
			

```

This example assumes Angular is built into static files and served by Nginx on port 80.

**backend-deployment.yaml**

```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-api
spec:
  replicas: {{ .Values.backend.replicaCount }}

  selector:
    matchLabels:
      app: node-api

  template:
    metadata:
      labels:
        app: node-api

    spec:
      containers:
        - name: node-api
          image: "{{ .Values.backend.image.repository }}:{{ .Values.backend.image.tag }}"

          ports:
            - containerPort: 3000

          env:
            - name: MONGO_HOST
              value: mongodb

            - name: MONGO_PORT
              value: "27017"

            - name: MONGO_DATABASE
              value: {{ .Values.mongodb.database | quote }}

            - name: MONGO_USERNAME
              valueFrom:
                secretKeyRef:
                  name: {{ .Values.mongodb.auth.existingSecret }}
                  key: username

            - name: MONGO_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: {{ .Values.mongodb.auth.existingSecret }}
                  key: password

```


The backend should construct its MongoDB connection string from these environment variables, properly encode credentials, and use authSource=admin when authenticating with the root account. For production, create a dedicated MongoDB application user with limited permissions instead.

**6. Kubernetes Services**

The Angular and backend Deployments each need a Service.

**frontend-service.yaml**

```yaml

apiVersion: v1
kind: Service
metadata:
  name: angular
spec:
  selector:
    app: angular
  ports:
    - port: {{ .Values.frontend.service.port }}
      targetPort: 80

```

**backend-service.yaml**

```yaml

apiVersion: v1
kind: Service
metadata:
  name: node-api
spec:
  selector:
    app: node-api
  ports:
    - port: {{ .Values.backend.service.port }}
      targetPort: 3000

```


For browser access, configure an Ingress that routes / to Angular and /api to Node.js. Angular can then call /api/... without exposing MongoDB.

**7. Install your application using Helm**

First, create the MongoDB authentication Secret in the namespace where you will install the chart:

```bash

kubectl create namespace angular-mongo

kubectl -n angular-mongo create secret generic mongodb-auth \
  --from-literal=username=admin \
  --from-literal=password='REPLACE_WITH_STRONG_PASSWORD'

```

Use a real strong password and avoid putting credentials in Git. The command above is an example; entering secrets on the command line may expose them in shell history.

Run these commands from the project root.

**Check your Helm templates:**

```bash

helm lint ./helm/angular-mongo

helm template myapp ./helm/angular-mongo

```

**Install Angular, Node.js, and MongoDB:**

```bash

helm upgrade --install myapp ./helm/angular-mongo \
  --namespace angular-mongo

```

**Verify the resources:**

```bash

kubectl get pods -n angular-mongo

kubectl get services -n angular-mongo

kubectl get pvc -n angular-mongo

kubectl get statefulsets -n angular-mongo

```

Expected PVC name:

mongo-storage-mongodb-0

The PVC should report Bound when persistent storage has been successfully provisioned.

Note: The examples above are a starting chart, not yet a fully production-ready application. The MongoDB Secret is created externally, and the Ingress, container Dockerfiles, and application API implementation still need to be added.

**8. Helm vs. Kubernetes: Which controls what?**

| **Component** | **Kubernetes resource** | **Helm responsibility** |
|----|----|----|
| Angular | Deployment | Image version and replicas |
| Angular networking | Service | Port configuration |
| Node.js API | Deployment | Image and environment settings |
| MongoDB | StatefulSet | Database configuration |
| Database storage | PVC / PV | Requested capacity and storage class |
| Passwords | Secret | References existing Secret |
| External routing | Ingress | Host and routing configuration |

Key takeaway: Helm manages the Kubernetes application configuration. Kubernetes runs the containers and manages their storage. MongoDB persists its data through the PVC, not through Helm itself.

For your Angular + MongoDB project, I recommend keeping Angular and Node.js as Deployments and MongoDB as a single-replica StatefulSet for local development. For production, use a properly configured MongoDB replica set or managed database.

# [README](./../../../README.md)
