# =========================
# Stage 1: Build Frontend (Vite)
# =========================
FROM node:22-bookworm-slim AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund

COPY frontend/ .

ENV VITE_API_URL=

RUN npm run build


# =========================
# Stage 2: Backend (Express JS - NO BUILD STEP)
# =========================
FROM node:22-bookworm-slim AS backend

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY backend/ .


# =========================
# Stage 3: Production Runner
# =========================
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# install backend production deps
COPY backend/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# backend source
COPY --from=backend /app/backend ./backend

# frontend build output
COPY --from=frontend-build /app/frontend/dist ./public

WORKDIR /app/backend

EXPOSE 3001

USER node

CMD ["node", "server.js"]