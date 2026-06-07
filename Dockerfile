# --- Stage 1: Install Dependencies ---
FROM node:20-alpine AS deps
# Install libc6-compat for sharp / other native Node packages
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles and manifest
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: Build Application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app
RUN npm run build

# --- Stage 3: Runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create low-privileged user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public directory and static build files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set permissions for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

# Start server
CMD ["node", "server.js"]