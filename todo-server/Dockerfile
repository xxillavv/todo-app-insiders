FROM node:24-slim AS base
RUN npm install -g pnpm@10.33.0
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate && pnpm build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json prisma.config.ts ./
COPY prisma ./prisma
EXPOSE 3001
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/main"]
