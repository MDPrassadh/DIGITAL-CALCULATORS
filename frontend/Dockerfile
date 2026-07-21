# ==========================================
# Maintainer: M Durga Prasad
# Multi-Stage Secure Application Container
# ==========================================
FROM node:20.17-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.17-alpine
LABEL maintainer="M Durga Prasad"

EXPOSE 80
ENV NODE_ENV=production

RUN addgroup -S -g 10001 calc && \
    adduser -S -u 10001 -G calc calc && \
    mkdir -p /app && \
    chown -R calc:calc /app

WORKDIR /app
COPY --from=builder --chown=calc:calc /app/dist ./dist
COPY --from=builder --chown=calc:calc /app/node_modules ./node_modules
COPY --from=builder --chown=calc:calc /app/package.json ./package.json

# Install a lightweight static server globally so 'calc' user can run it
RUN npm install -g serve

USER calc
CMD ["serve", "-s", "dist", "-l", "80"]
