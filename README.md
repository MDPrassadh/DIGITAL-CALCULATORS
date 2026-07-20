Here is an elite, interviewer-ready `README.md` file.

When interviewers look at a repository, they aren’t just looking at code; they are looking at **architecture, security, DevOps maturity, and documentation**. This README is explicitly designed to showcase your senior-level understanding of cloud-native development, GitOps, and security.

Create or overwrite your `README.md` at the root of your project with this code:

```markdown
# 🧮 Digital Calculators: Enterprise Cloud-Native Platform

![Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Deployment](https://img.shields.io/badge/Deployment-GitOps_(ArgoCD)-emerald)
![Cloud](https://img.shields.io/badge/Cloud-AWS_EKS-orange)
![Maintainer](https://img.shields.io/badge/Architect-M_Durga_Prasad-purple)

> **Live Domain:** [prassadhmulticloud.online](https://prassadhmulticloud.online)

A highly scalable, multi-tier digital calculator platform. This project serves as a comprehensive showcase of modern cloud-native engineering, featuring a **React/Vite** frontend, a **Node.js/PostgreSQL** REST API, and a fully automated **GitOps deployment pipeline** targeting **AWS Elastic Kubernetes Service (EKS)**.

---

## 🎯 Platform Features

*   **Multi-Domain Calculators:** 
    *   **Financial Suite:** Mortgage, Loan, and Retirement logic.
    *   **Health & Fitness:** BMI, Calorie, and Body Fat analysis.
    *   **Math & Scientific:** Advanced expressions and fraction handling.
    *   **Live Currency Exchange:** Real-time exchange simulations.
*   **Secure Authentication:** JWT-based user sessions and BCrypt password hashing.
*   **Audit Logging:** Persistent tracking of user calculation history stored in PostgreSQL.
*   **Responsive UI:** Styled with Tailwind CSS for seamless desktop and mobile experiences.

---

## 🏗️ Technology Stack

| Tier | Technology | Purpose / Justification |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS | Fast compilation, modern SPA routing, and utility-first styling. |
| **Backend** | Node.js, Express.js | Non-blocking I/O API engine tailored for high-concurrency requests. |
| **Database** | PostgreSQL 15 | Relational mapping for user identities and immutable calculation logs. |
| **Containerization** | Docker, Nginx (Alpine) | Multi-stage builds minimizing attack surfaces and image footprints. |
| **CI Pipeline** | GitHub Actions, Trivy | Automated vulnerability scanning and secure image building. |
| **CD Pipeline** | ArgoCD (GitOps) | Automated cluster synchronization and state drift remediation. |
| **Infrastructure** | AWS EKS, ALB Ingress | Scalable Kubernetes orchestration with secure TLS/SSL routing. |

---

## 📂 Architecture & Directory Structure

The repository enforces a strict separation of concerns, decoupling application code from infrastructure declarations.

```text
C:.
├── .github/workflows/
│   └── secure-ci.yaml            # CI Pipeline: Trivy scans, AWS OIDC auth, and ECR pushing
├── backend/                      # Node.js API Microservice
│   ├── src/
│   │   └── server.js             # Express routes, DB pool, and JWT middleware
│   ├── Dockerfile                # Multi-stage Alpine container (Runs as non-root UID 10001)
│   └── package.json              # Backend dependencies
├── frontend/                     # React Single Page Application
│   ├── src/
│   │   ├── components/           # Modular UI (Auth, MathCalc, CurrencyCalc, etc.)
│   │   ├── App.jsx               # Main Dashboard Router
│   │   └── main.jsx              # React Entry Point
│   ├── Dockerfile                # Nginx Web Server container (Rootless)
│   ├── nginx.conf                # SPA Fallback Routing config for Nginx
│   ├── vite.config.js            # Vite build configuration
│   └── index.html                # HTML Base Template
├── k8s/                          # Kubernetes Manifests (The "Desired State")
│   ├── backend-deployment.yaml   # API scaling, limits, and DB environment injection
│   ├── database-statefulset.yaml # PostgreSQL StatefulSet with Persistent Volumes
│   ├── frontend-deployment.yaml  # UI scaling and resource bounds
│   └── ingress.yaml              # AWS ALB config routing traffic to /api and /
└── argocd-application.yaml       # ArgoCD Custom Resource linking this repo to EKS

```

---

## 🔄 CI/CD & GitOps Workflow

This project abandons manual `kubectl` deployments in favor of a declarative, pull-based GitOps model.

### 1. Continuous Integration (GitHub Actions)

When code is pushed to `main`:

1. **Security Audit:** Trivy scans the filesystem for CVEs. The build fails if CRITICAL or HIGH vulnerabilities are detected.
2. **OIDC Authentication:** Authenticates to AWS securely without storing long-lived IAM static keys.
3. **Build & Push:** Compiles the Docker images and pushes them to **Amazon ECR**.
4. **Manifest Mutation:** The pipeline programmatically updates the image tags inside `k8s/*-deployment.yaml` and commits the new state back to the repository.

### 2. Continuous Deployment (ArgoCD)

1. **State Reconciliation:** ArgoCD continually monitors the `/k8s` directory.
2. **Automated Sync:** Upon detecting the CI pipeline's commit, ArgoCD synchronizes the new ECR image tags into the active **AWS EKS** cluster.
3. **Self-Healing:** If a manual, unauthorized change is made directly in the cluster, ArgoCD automatically overwrites it to match the Git repository's desired state.

---

## 🛡️ Enterprise Security Posture

Security was shifted left and embedded deeply into the infrastructure:

* **Rootless Containers:** The Nginx and Node.js Dockerfiles drop kernel capabilities and execute as unprivileged users (`UID 10001`).
* **Immutable Filesystems:** Kubernetes deployments enforce `readOnlyRootFilesystem: true`, neutralizing malware attempting to write to the container shell.
* **Strict CORS Policies:** The backend API strictly rejects Cross-Origin requests originating from anywhere other than `https://prassadhmulticloud.online`.
* **Passwordless CI/CD:** GitHub Actions relies entirely on OpenID Connect (OIDC) for AWS authentication.

---

## 👨‍💻 Local Development Guide

### Prerequisites

* Node.js (v18+)
* Docker Desktop (Optional, for local database container)

### Step 1: Initialize the Database

```bash
# Run a local PostgreSQL instance for testing
docker run --name calc-db -e POSTGRES_USER=calc_admin -e POSTGRES_PASSWORD=VaultPass99 -e POSTGRES_DB=calculator_db -p 5432:5432 -d postgres:15-alpine

```

### Step 2: Boot the Backend Engine

```bash
cd backend
npm install
npm start
# Server listens on http://localhost:8080. It will auto-initialize the database tables on startup.

```

### Step 3: Serve the Frontend

```bash
cd frontend
npm install
npm run dev
# Vite Hot-Module Replacement server available at http://localhost:5173

```

---

*Architected and Engineered with precision by **M Durga Prasad**.*

```

### Why Interviewers Will Love This:
1.  **The "Architecture" Table:** It doesn't just list technologies; it explains *why* you chose them (e.g., "Non-blocking I/O," "Multi-stage builds"). 
2.  **The "GitOps Workflow" Section:** This proves you understand the *concept* of GitOps (state reconciliation, self-healing, OIDC), not just how to copy-paste YAML.
3.  **The "Security Posture" Section:** Mentioning `readOnlyRootFilesystem`, unprivileged UIDs, and OIDC are massive green flags for senior DevOps/Cloud engineering roles.

Drop this into your repository, and it will serve as an incredible portfolio piece!

```
