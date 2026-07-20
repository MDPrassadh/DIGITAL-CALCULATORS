# ==========================================
# Maintainer: M Durga Prasad
# Multi-Stage Secure Production Build
# ==========================================
FROM node:20.17-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
LABEL maintainer="M Durga Prasad"

# Enforce non-root security context
RUN addgroup -g 10001 -S calcgroup && \
    adduser -S calcuser -u 10001 -G calcgroup

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R calcuser:calcgroup /usr/share/nginx/html && \
    chown -R calcuser:calcgroup /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown calcuser:calcgroup /var/run/nginx.pid

USER calcuser
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]