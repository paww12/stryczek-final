# Użyj oficjalnego obrazu Node.js 18 Alpine jako bazy
FROM node:18-alpine AS base

# Ustaw zmienne środowiskowe dla PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Zainstaluj Corepack@0.31.0 i przygotuj PNPM@9.15.4
RUN npm install -g corepack@0.31.0 && corepack enable && corepack prepare pnpm@9.15.4 --activate

# Instalacja zależności tylko wtedy, gdy jest to konieczne
FROM base AS deps
WORKDIR /app

# Skopiuj package.json i pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Zainstaluj zależności za pomocą PNPM
RUN pnpm install --frozen-lockfile

# Przebuduj kod źródłowy tylko wtedy, gdy jest to konieczne
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

# Zbuduj aplikację za pomocą PNPM
RUN pnpm run build

# Obraz produkcyjny
FROM base AS runner
WORKDIR /app

# Ustaw zmienne środowiskowe
ENV NODE_ENV production

# Utwórz użytkownika i grupę dla lepszego bezpieczeństwa
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Skopiuj folder public, jeśli istnieje
COPY --from=builder /app/public ./public

# Ustaw uprawnienia dla cache prerender
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Skopiuj wyjście standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Przełącz na użytkownika non-root
USER nextjs

# Otwórz port
EXPOSE 3000

# Ustaw zmienną środowiskową dla portu
ENV PORT 3000

# Uruchom aplikację
CMD ["node", "server.js"]