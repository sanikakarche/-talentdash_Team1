FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable

# Stage 1: Prune workspace to just jobs and its dependencies
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo prune @talentdash/jobs --docker

# Stage 2: Install dependencies
FROM base AS installer
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

# Stage 3: Build the project
FROM base AS builder
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@talentdash/jobs...

# Stage 4: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Add standard non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 runner

COPY --from=builder --chown=runner:nodejs /app .

USER runner

EXPOSE 8080

CMD ["node", "apps/jobs/dist/server.js"]