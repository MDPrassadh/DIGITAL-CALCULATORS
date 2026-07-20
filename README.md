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
