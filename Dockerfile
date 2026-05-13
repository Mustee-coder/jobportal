# ---------------------------
# Stage 1: Build Frontend (Vite)
# ---------------------------
FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ ./

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

ENV VITE_API_URL=

RUN npm run build


# ---------------------------
# Stage 2: Build Backend (Express / TypeScript)
# ---------------------------
FROM node:22-bookworm-slim AS backend-build

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --no-audit --no-fund

COPY backend/ .

ENV NODE_ENV=production

RUN npm run build


# ---------------------------
# Stage 3: Runtime Image
# ---------------------------
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# install production deps only
COPY backend/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force

# backend build output
COPY --from=backend-build /app/dist ./dist

# frontend build output
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3001

USER node

CMD ["node", "dist/index.js"]