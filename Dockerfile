# 1) Build stage: install everything and build TypeScript
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# 2) Runtime stage: slimmer final image
FROM node:18-alpine AS runtime
WORKDIR /app

# 👉 Install curl in runtime stage for healthchecks
RUN apk add --no-cache curl

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy necessary build artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# CMD will be provided by docker-compose