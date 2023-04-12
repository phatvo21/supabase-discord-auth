# Instal package dependencies
FROM node:16-alpine AS dependency

WORKDIR /supabase-discord-auth

COPY package*.json ./
RUN npm ci

# Build source
FROM dependency AS base
COPY . .

# Build source
FROM base AS build
RUN npm run build

# Ship compiled sources
FROM dependency

COPY --from=build /supabase-discord-auth/dist ./dist

RUN npm prune --production

CMD ["node", "--enable-source-maps", "-r" , "./dist/index.js"]