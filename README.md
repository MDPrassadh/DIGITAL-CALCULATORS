# 🧮 Digital Calculators: Enterprise Cloud-Native Platform

![Architecture](https://img.shields.io/badge/Architecture-Cloud--Native-blue)
![Deployment](https://img.shields.io/badge/Deployment-GitOps_(ArgoCD)-emerald)
![Cloud](https://img.shields.io/badge/Cloud-AWS_EKS-orange)
![Maintainer](https://img.shields.io/badge/Architect-M_Durga_Prasad-purple)

> **Live Domain:** [prassadhmulticloud.online](https://prassadhmulticloud.online)

A comprehensive, enterprise-grade digital calculator hub featuring advanced mathematics, financial planning, health tracking, utilities, and live currency exchange. Built with a secure, multi-tier microservices architecture and deployed continuously via **GitOps (ArgoCD)** to **AWS Elastic Kubernetes Service (EKS)**.

**Architected & Maintained by:** M Durga Prasad

---

## 🚀 Key Features

*   **📐 Math & Scientific:** Advanced scientific calculations, fractions, and percentages.
*   **📈 Financial Suite:** Mortgage, loan, retirement, and interest calculators.
*   **🍏 Health & Fitness:** BMI tracking, calorie counters, and body fat analysis.
*   **⚙️ Utilities:** Precise age, date, and time calculators.
*   **💱 Currency Exchange:** Live global exchange rate conversions.
*   **🔐 Enterprise Security:** JWT-based user authentication, BCrypt password hashing, and strict CORS policies.
*   **📊 Audit History:** Comprehensive database logging of all user calculation histories.

---

## 🏗️ Technology Stack

*Designed for high availability, minimal attack surface, and developer velocity.*

| Tier | Technology | Purpose & DevOps Justification |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind | Fast compilation, modern SPA routing, and utility-first styling. |
| **Backend** | Node.js 20, Express.js | Non-blocking I/O API engine tailored for high-concurrency requests. |
| **Database** | PostgreSQL 15 | Relational mapping for user identities and immutable calculation logs. |
| **Containers** | Docker, Nginx (Alpine) | Multi-stage builds minimizing attack surfaces and image footprints. |
| **CI Pipeline** | GitHub Actions, Trivy | Automated vulnerability scanning and secure image building via OIDC. |
| **CD Pipeline** | ArgoCD (GitOps) | Automated cluster synchronization and state drift remediation. |
| **Infrastructure**| AWS EKS, ALB Ingress | Scalable Kubernetes orchestration with secure TLS/SSL routing. |

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
│   ├── Dockerfile                # Multi-stage Alpine container (Runs as non-root)
│   └── package.json              # Backend dependencies
├── frontend/                     # React Single Page Application
│   ├── src/
│   │   ├── components/           # Modular UI Components
│   │   │   ├── Auth.jsx          # JWT Login & Registration UI
│   │   │   ├── CurrencyCalc.jsx  # Live Exchange Rate Module
│   │   │   ├── FinancialCalc.jsx # Mortgage & Loan Module


🔄 CI/CD & GitOps Workflow

This project abandons manual deployments in favor of a declarative, pull-based GitOps model. This ensures the cluster always matches the code in Git.

I. Continuous Integration (GitHub Actions)When code is pushed to the main branch:

1 Security Audit:
     Trivy scans the filesystem for CVEs. The build automatically fails if CRITICAL or HIGH vulnerabilities are detected.

2 OIDC Authentication:
         Authenticates to AWS securely without storing long-lived IAM static keys.

3 Build & Push:
         Compiles the Docker images and pushes them to Amazon ECR.

4 Manifest Mutation: The pipeline programmatically updates the image tags inside k8s/*-deployment.yaml and commits the new state back to the repository.

II. Continuous Deployment (ArgoCD)

1 State Reconciliation:
         ArgoCD continually monitors the /k8s directory in this repository.

2 Automated Sync:
           Upon detecting the CI pipeline's commit, ArgoCD synchronizes the new ECR image tags into the active AWS EKS cluster.

3 Self-Healing:
         If a manual, unauthorized change is made directly in the cluster (e.g., via kubectl), ArgoCD automatically overwrites it to match the Git repository's desired state.

🛡️ Enterprise Security Posture
        Security was shifted left and embedded deeply into the infrastructure:

Rootless Containers:
 The Nginx and Node.js Dockerfiles drop kernel capabilities and execute as unprivileged users (UID 10001).

Immutable Filesystems:
            Kubernetes deployments enforce readOnlyRootFilesystem: true, neutralizing malware attempting to write to the container shell.

Strict Network Policies:
            The backend API strictly rejects Cross-Origin requests originating from anywhere other than https://prassadhmulticloud.online

.Passwordless CI/CD:
        GitHub Actions relies entirely on OpenID Connect (OIDC) for AWS authentication, preventing credential leaks.

👨‍💻 Local Development Guide

Prerequisites:

   Node.js (v18+)
   Docker Desktop (Optional, for local database container)



## 👨‍💻 Local Development Guide

### Prerequisites
*   Node.js (v18+)
*   Docker Desktop (Optional, for local database container)

### Step 1: Initialize the Database
```bash
# Run a local PostgreSQL instance for testing
docker run --name calc-db -e POSTGRES_USER=calc_admin -e POSTGRES_PASSWORD=VaultPass99 -e POSTGRES_DB=calculator_db -p 5432:5432 -d postgres:15-alpine

Step 2: Boot the Backend EngineBashcd backend
```bash
npm install
npm start

# Server listens on http://localhost:8080. It will auto-initialize the database tables on startup.


Step 3: Serve the FrontendBashcd frontend
```bash
npm install
npm run dev

# Vite Hot-Module Replacement server available at http://localhost:5173
