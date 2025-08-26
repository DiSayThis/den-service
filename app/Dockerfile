FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable

COPY package.json yarn.lock* .yarnrc.yml package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN  yarn install --immutable 
#  npm ci 

FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_STRAPI_FETCH=true
RUN yarn build
#  npm run build

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV SKIP_STRAPI_FETCH=false

RUN corepack enable

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]