# -----------------------------------------------------------------------------
# STAGE 1: Base
# We use 'alpine' because it's a tiny Linux distribution (5MB vs Ubuntu's 30MB)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat openssl

# -----------------------------------------------------------------------------
# STAGE 2: Dependencies
# We install all the NPM packages. We do this in a separate stage so we can
# cache this layer. If you change your code but not your package.json, 
# Docker skips this slow step!
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for building)
RUN npm ci

# -----------------------------------------------------------------------------
# STAGE 3: Builder
# Now we copy your source code and build the app.
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Important: We must regenerate the Prisma Client here because the
# Linux environment inside Docker might be different from your Mac/Windows.
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# -----------------------------------------------------------------------------
# STAGE 4: Runner
# This is the actual image that will run on your server.
# It is clean, minimal, and only has what is needed to serve requests.
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user (Security Best Practice)
# If someone hacks your app, they won't have root access to the container.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the "Standalone" build from the Builder stage
# We only copy the specific folders we need.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the secure user
USER nextjs

# Expose the port
EXPOSE 3000

# Start the server!
CMD ["node", "server.js"]