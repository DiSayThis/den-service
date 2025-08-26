FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --production

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]
