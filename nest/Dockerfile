FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build

COPY package.json pnpm-lock.yaml ./

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

RUN pnpm run build

FROM node:22-alpine AS release

RUN corepack enable && apk add --no-cache dumb-init

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --from=prod-deps --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=prod-deps --chown=nodejs:nodejs /usr/src/app/package.json ./package.json
COPY --from=build --chown=nodejs:nodejs /usr/src/app/dist ./dist

# USER nodejs

EXPOSE 3000

CMD ["dumb-init", "node", "dist/main.js"]
