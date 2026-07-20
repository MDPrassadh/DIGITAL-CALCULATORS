# Digital Calculators 🧮☁️

![Architecture](https://img.shields.io/badge/Architecture-Cloud--Native-blue)
![Deployment](https://img.shields.io/badge/Deployment-GitOps-emerald)
![Maintainer](https://img.shields.io/badge/Maintainer-M_Durga_Prasad-purple)

A comprehensive, enterprise-grade digital calculator hub featuring advanced mathematics, financial planning, health tracking, utilities, and live currency exchange. Built with a secure, multi-tier microservices architecture and deployed continuously via **GitOps (ArgoCD)** to **AWS EKS**.

**Maintained & Architected by:** M Durga Prasad

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

### Frontend (Client-Side)
*   **Framework:** React 18 + Vite
*   **Styling:** Tailwind CSS
*   **Containerization:** Nginx (Alpine, Non-Root execution)

### Backend (API Engine)
*   **Runtime:** Node.js 20 + Express.js
*   **Database:** PostgreSQL 15
*   **Containerization:** Multi-stage Docker (Alpine, Non-Root execution)

### CI/CD & Infrastructure (GitOps)
*   **Continuous Integration:** GitHub Actions (Trivy Security Scans + AWS OIDC)
*   **Container Registry:** Amazon Elastic Container Registry (ECR)
*   **Continuous Deployment:** ArgoCD
*   **Orchestration:** AWS Elastic Kubernetes Service (EKS)
*   **Routing:** AWS Application Load Balancer (ALB) via Ingress

---

## 📂 Project Structure

```text
.
├── .github/workflows/      # GitHub Actions CI pipeline configuration
├── backend/                # Node.js/Express REST API engine
│   ├── src/                # Backend source code and DB initialization
│   ├── Dockerfile          # Secure multi-stage backend container
│   └── package.json        # Backend dependencies
├── frontend/               # React/Vite UI application
│   ├── src/                # React components and routing logic
│   ├── Dockerfile          # Secure Nginx frontend container
│   ├── nginx.conf          # SPA routing configuration
│   └── package.json        # Frontend dependencies
├── k8s/                    # Kubernetes declarative configurations
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── database-statefulset.yaml
│   └── ingress.yaml        # ALB Ingress routing (prassadhmulticloud.online)
└── argocd-application.yaml # ArgoCD synchronization tracking

🛠️ Local Development Setup
Prerequisites
Node.js (v18+)

Docker & Docker Compose (optional for local DB testing)

PostgreSQL (Local instance or Docker container)

1. Start the Backend
          cd backend
          npm install
# Ensure you have a local Postgres instance running or adjust the connection string in src/server.js
npm start
API will be available at http://localhost:8080

2.Start the Frontend
           cd frontend
           npm install
           npm run dev
React app will be available at http://localhost:5173

☁️ GitOps Deployment Pipeline
This repository is configured for absolute continuous deployment using GitOps. Manual kubectl apply commands are restricted.

Push to Main: A developer commits and pushes code to the main branch.

GitHub Actions (CI):

Checks out the code.

Runs Trivy vulnerability scans on the filesystem.

Authenticates to AWS via secure OIDC (no static credentials).

Builds and pushes the Docker images to Amazon ECR.

Automatically updates the image tags in the /k8s manifest files and commits the changes.

ArgoCD (CD):

Detects the automated commit made by GitHub Actions.

Synchronizes the desired state in the Git repository with the live AWS EKS cluster.

Handles self-healing and drift remediation automatically.

🛡️ Security Posture
Rootless Containers: All Docker containers (Nginx and Node) drop root privileges and run as restricted users (UID 10001).

Immutable Infrastructure: readOnlyRootFilesystem is enforced across all Kubernetes deployments.

Secrets Management: Sensitive keys and database URLs are injected dynamically via Kubernetes Secrets/Environment variables.

Network Security: Strict CORS configurations ensure the API only accepts traffic from prassadhmulticloud.online.

© 2026 Digital Calculators. Architected by M Durga Prasad.


Make those two quick swaps in your React files, save this README, and you are 100% ready to ship it to GitHub!
