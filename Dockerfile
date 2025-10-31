# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-alpine AS deps

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Habilitar pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar arquivos de dependências do pnpm
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Instalar dependências usando pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ==================================
# Stage 2: Builder
# ==================================
FROM node:20-alpine AS builder

WORKDIR /app

# Habilitar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Definir variáveis de ambiente básicas
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Pular validação de env vars SERVER durante build
ENV SKIP_ENV_VALIDATION=true

# Declarar build args para variáveis públicas
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_APP_ENV=production
ARG NEXT_PUBLIC_ENABLE_AI_FEATURES=true
ARG NEXT_PUBLIC_USE_FIREBASE_EMULATOR=false

# Exportar como env vars
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV NEXT_PUBLIC_ENABLE_AI_FEATURES=$NEXT_PUBLIC_ENABLE_AI_FEATURES
ENV NEXT_PUBLIC_USE_FIREBASE_EMULATOR=$NEXT_PUBLIC_USE_FIREBASE_EMULATOR

# Build da aplicação Next.js
RUN pnpm run build

# ==================================
# Stage 3: Runner (Produção)
# ==================================
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Definir ambiente de produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=false

# Copiar arquivos públicos (se existir)
COPY --from=builder /app/public ./public

# Copiar arquivos de build do Next.js (standalone output)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Mudar para usuário não-root
USER nextjs

# Expor porta padrão do Next.js
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ✅ ADICIONAR: Healthcheck para o Coolify
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Comando para iniciar a aplicação
CMD ["node", "server.js"]