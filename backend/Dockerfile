# ==========================================
# Maintainer: M Durga Prasad
# Multi-Stage Secure Application Container
# ==========================================
FROM node:20.17-alpine AS builder
WORKDIR /opt/server
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20.17-alpine
LABEL maintainer="M Durga Prasad"

EXPOSE 8080
ENV NODE_ENV=production

RUN addgroup -S -g 10001 calc && \
    adduser -S -u 10001 -G calc calc && \
    mkdir -p /opt/server && \
    chown -R calc:calc /opt/server

WORKDIR /opt/server
COPY --from=builder --chown=calc:calc /opt/server/node_modules ./node_modules
COPY --from=builder --chown=calc:calc /opt/server/package.json ./package.json
COPY --from=builder --chown=calc:calc /opt/server/src ./src

USER calc
CMD ["node", "./src/server.js"]
