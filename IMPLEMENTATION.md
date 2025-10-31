# ✅ [FIN-013][CORE-011] Healthcheck & Smoke Tests - Implementação Completa (com i18n)

## 📋 Resumo da Tarefa

Implementação de health check endpoint, páginas de erro globais (404/500) e smoke tests para garantir "sinal de vida" do app e reduzir MTTR (Mean Time To Recovery).

**✨ NOVIDADE:** Todos os textos visíveis ao usuário agora usam **internacionalização (i18n)** com suporte para **pt-BR** e **en**.

---

## 🎯 Objetivos Alcançados

- ✅ Rota `/health` SSR-safe retornando `{status, version, env, timestamp}`
- ✅ Página `not-found.tsx` global (404)
- ✅ Página `error.tsx` global (500)
- ✅ Script de smoke test automatizado
- ✅ Documentação de troubleshooting no README

---

## 📁 Arquivos Criados

### 1. **`app/health/route.ts`** - Health Check Endpoint

**Localização:** `src/app/health/route.ts`

**Características:**
- ✅ SSR-safe (sem dependências de browser)
- ✅ Retorna estrutura padronizada
- ✅ Inclui versão do package.json
- ✅ Detecta ambiente (dev/prod)
- ✅ Headers de cache desabilitados
- ✅ Tratamento de erros robusto

**Resposta:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "env": "development",
  "timestamp": "2025-10-31T10:30:00.000Z"
}
```

**Importações necessárias:**
```typescript
import { NextResponse } from "next/server";
import { isDevelopment, isProduction } from "@/config/env";
```

---

### 2. **`app/not-found.tsx`** - Página 404

**Localização:** `src/app/not-found.tsx`

**Características:**
- ✅ Design limpo e profissional
- ✅ Botão para voltar à home
- ✅ Botão para voltar à página anterior
- ✅ Link para suporte
- ✅ Ícones do lucide-react
- ✅ Totalmente responsivo
- ✅ Integrado com shadcn/ui (Tailwind)

**Importações necessárias:**
```typescript
import { useTranslations } from "next-intl";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
```

**Chaves de tradução usadas:**
- `errors.notFound.title` - Título da página
- `errors.notFound.description` - Descrição do erro
- `errors.notFound.actions.goHome` - Botão "Ir para Home"
- `errors.notFound.actions.goBack` - Botão "Voltar"
- `errors.notFound.supportText.prefix` - Texto antes do link
- `errors.notFound.supportText.link` - Texto do link de suporte

**Exemplo de uso:**
```tsx
const t = useTranslations("errors.notFound");

<h1>{t("title")}</h1>
<p>{t("description")}</p>
<button>{t("actions.goHome")}</button>
```

---

### 3. **`app/error.tsx`** - Página de Erro Global

**Localização:** `src/app/error.tsx`

**Características:**
- ✅ Client Component (necessário para `reset()`)
- ✅ Integrado com `safe-error.ts` (logging)
- ✅ Mostra detalhes do erro em development
- ✅ Oculta detalhes em production (segurança)
- ✅ Botão "Tentar novamente" (reset)
- ✅ Botão para voltar à home
- ✅ Design consistente com not-found

**Importações necessárias:**
```typescript
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { logSafeError } from "@/lib/safe-error";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
```

**Chaves de tradução usadas:**
- `errors.serverError.title` - Título da página
- `errors.serverError.description` - Descrição do erro
- `errors.serverError.devMode.label` - Label do erro em dev
- `errors.serverError.actions.tryAgain` - Botão "Tentar novamente"
- `errors.serverError.actions.goHome` - Botão "Voltar para Home"
- `errors.serverError.supportText.prefix` - Texto antes do link
- `errors.serverError.supportText.link` - Texto do link de suporte

**⚠️ IMPORTANTE:** 
- Este arquivo **deve ser Client Component** (`"use client"`)
- A lógica de erro é isolada e não afeta domain layer (que permanece SSR-safe)
- Usa `useTranslations` para internacionalização

---

### 4. **`scripts/smoke-test.js`** - Smoke Test Automatizado

**Localização:** `scripts/smoke-test.js`

**Características:**
- ✅ Standalone (Node.js puro, sem dependências extras)
- ✅ Testa health endpoint
- ✅ Valida estrutura da resposta
- ✅ Timeout configurável (10s)
- ✅ Exit codes corretos (0 = sucesso, 1 = falha)
- ✅ Output colorido e detalhado

**O que valida:**
- Status code 200
- Response é JSON válido
- Campos obrigatórios presentes (`status`, `version`, `env`, `timestamp`)
- Status é "ok"
- Ambiente é válido (development/production/unknown)
- Timestamp é ISO válido

**Uso:**
```bash
node scripts/smoke-test.js
```

**Variáveis de ambiente:**
- `APP_URL` (padrão: `http://localhost:3000`)

---

### 5. **`package.json.example`** - Scripts Necessários

**Scripts adicionados:**
```json
{
  "scripts": {
    "check:ssr": "node scripts/check-ssr-safe.js",
    "smoke": "node scripts/smoke-test.js",
    "smoke:ci": "start-server-and-test dev http://localhost:3000/health smoke",
    "test": "npm run check:ssr && npm run smoke:ci"
  }
}
```

**Descrição dos scripts:**
- `check:ssr` - Valida que domain layer é SSR-safe
- `smoke` - Executa smoke test (requer app rodando)
- `smoke:ci` - Inicia app, espera health check e roda smoke test
- `test` - Executa todos os testes (SSR + smoke)

**Dependência adicional necessária:**
```json
{
  "devDependencies": {
    "start-server-and-test": "^2.0.0"
  }
}
```

---

### 6. **README.md** - Seção de Troubleshooting

**Adicionado:**
- Instruções de health check
- Como executar smoke test
- Problemas comuns e soluções
- Comandos de debug

---

### 7. **messages/pt-BR.json** - Traduções em Português

**Localização:** `src/messages/pt-BR.json`

**Novas chaves adicionadas:**
```json
{
  "errors": {
    "notFound": { ... },
    "serverError": { ... }
  },
  "health": { ... }
}
```

**Conteúdo:**
- Traduções para página 404
- Traduções para página de erro 500
- Traduções para health check (labels de campos, status, ambientes)

---

### 8. **messages/en.json** - Traduções em Inglês

**Localização:** `src/messages/en.json`

**Características:**
- Mesma estrutura que pt-BR.json
- Todas as chaves traduzidas para inglês
- Mantém consistência com traduções existentes

---

### 9. **I18N_GUIDE.md** - Guia de Internacionalização

**Localização:** `docs/I18N_GUIDE.md`

**Conteúdo:**
- Estrutura completa de i18n do projeto
- Convenções de nomenclatura
- Como usar `useTranslations`
- Exemplos práticos
- Checklist para novas traduções
- Boas práticas

---

## 🚀 Como Usar

### 1. Copiar Arquivos

```bash
# Copiar health check
cp app/health/route.ts src/app/health/route.ts

# Copiar páginas de erro (já com i18n)
cp app/not-found.tsx src/app/not-found.tsx
cp app/error.tsx src/app/error.tsx

# Copiar smoke test
cp scripts/smoke-test.js scripts/smoke-test.js
chmod +x scripts/smoke-test.js

# Copiar traduções
cp messages/pt-BR.json src/messages/pt-BR.json
cp messages/en.json src/messages/en.json

# Copiar documentação
cp I18N_GUIDE.md docs/I18N_GUIDE.md
```

### 2. Atualizar Traduções Existentes

**IMPORTANTE:** Os arquivos `pt-BR.json` e `en.json` já existem no projeto. 

Você precisa **mesclar** as novas chaves com as existentes:

```bash
# Abra os arquivos existentes
# src/messages/pt-BR.json
# src/messages/en.json

# Adicione as novas seções:
# - errors.notFound
# - errors.serverError
# - health
```

**Ou use o script de merge (recomendado):**
```bash
# Crie um script para mesclar JSONs
node scripts/merge-translations.js
```

### 3. Adicionar Scripts ao package.json

Adicione os scripts listados em `package.json.example` ao seu `package.json`.

Instale a dependência:
```bash
npm install -D start-server-and-test
```

### 3. Testar Health Check

```bash
# Iniciar app
npm run dev

# Em outro terminal, testar health
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "env": "development",
  "timestamp": "2025-10-31T12:00:00.000Z"
}
```

### 4. Executar Smoke Test

```bash
# App deve estar rodando
npm run smoke
```

**Output esperado:**
```
🔍 Iniciando smoke test...

📍 URL: http://localhost:3000
🏥 Health Check: http://localhost:3000/health

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Testando /health endpoint...
   ✓ Status code: 200
   ✓ Response is valid JSON
   ✓ All required fields present
   ✓ Status is "ok"
   ✓ Environment: development
   ✓ Version: 1.0.0
   ✓ Timestamp is valid ISO date

✅ Health check PASSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Smoke test PASSED (1/1 tests)
🎉 Application is healthy!
```

### 5. Testar Páginas de Erro

**Testar 404:**
```bash
# Acesse uma rota inexistente
http://localhost:3000/rota-que-nao-existe
```

**Testar 500:**
```bash
# Simule um erro em alguma página/componente
# A página error.tsx será exibida automaticamente
```

### 6. Testar Internacionalização (i18n)

**Trocar idioma:**
```bash
# 1. Acesse a aplicação
http://localhost:3000

# 2. Use o seletor de idioma (ícone de línguas no header)
# 3. Alterne entre pt-BR e en
```

**Validar traduções:**
```bash
# Navegue para /rota-inexistente (404)
# - Em pt-BR: "Página não encontrada"
# - Em en: "Page not found"

# Simule um erro (500)
# - Em pt-BR: "Algo deu errado"
# - En en: "Something went wrong"
```

**Verificar chaves faltantes:**
```bash
# Abra o console do navegador
# Se houver chaves faltantes, aparecerá:
# "Missing translation: errors.notFound.title"
```

---

## 🏗️ Arquitetura e Decisões

### Por que Client Component em error.tsx?

O arquivo `error.tsx` **precisa ser Client Component** porque:

1. **Função `reset()`** - Fornecida pelo Next.js, só funciona no client
2. **Hook `useEffect`** - Usado para logging, só funciona no client
3. **Isolamento** - A lógica de erro está isolada; domain layer permanece SSR-safe

**Não há violação dos princípios SSR-safe** porque:
- Domain layer não importa `error.tsx`
- `error.tsx` está na camada de UI (app/)
- Lógica de negócio continua no servidor

### Por que standalone smoke test?

O smoke test é standalone (sem frameworks de teste) porque:

1. **Simplicidade** - Apenas Node.js, sem setup adicional
2. **CI/CD** - Fácil de integrar em pipelines
3. **Zero dependências** - Não requer instalação de libs de teste
4. **Rápido** - Executa em segundos

### Integração com i18n

As páginas de erro agora usam **next-intl** para internacionalização:

**Por que é importante:**
1. **Experiência do usuário** - Mensagens no idioma preferido
2. **Escalabilidade** - Fácil adicionar novos idiomas
3. **Consistência** - Padrão único em todo o projeto
4. **Manutenção** - Textos centralizados em arquivos JSON

**Como funciona:**
```tsx
// Componente usa useTranslations
const t = useTranslations("errors.notFound");

// Renderiza texto traduzido
<h1>{t("title")}</h1>
```

**Arquivos de tradução:**
- `src/messages/pt-BR.json` - Português (padrão)
- `src/messages/en.json` - Inglês

**⚠️ REGRA:** Todo texto visível ao usuário DEVE usar i18n.

---

## ✅ Checklist da Tarefa

- [x] Criar `app/health/route.ts` (GET)
- [x] Implementar `not-found.tsx` e `error.tsx` genéricos
- [x] Script pnpm smoke (simples e funcional)
- [x] Documentar no README (troubleshooting básico)
- [x] **Adicionar internacionalização (i18n)** em todas as páginas de erro
- [x] **Criar traduções pt-BR e en** para errors.* e health.*
- [x] **Documentar guia de i18n** (I18N_GUIDE.md)

---

## 🎯 Resultado Final

Com esta implementação, o Finance AI agora possui:

1. **Health Check** - Monitoramento rápido do status da aplicação
2. **Páginas de Erro** - Experiência consistente quando algo dá errado
3. **Smoke Tests** - Validação automatizada antes de deploy
4. **Troubleshooting** - Guia para resolver problemas comuns
5. **🌍 Internacionalização** - Páginas de erro em pt-BR e en
6. **📚 Guia de i18n** - Documentação completa para desenvolvedores

**MTTR (Mean Time To Recovery) reduzido** ✅  
**UX multilíngue implementada** ✅

---

## 📚 Referências

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Health Check Best Practices](https://microservices.io/patterns/observability/health-check-api.html)

---

## 🚀 Próximos Passos

### Imediato

1. ✅ Copiar `messages/pt-BR.json` e `messages/en.json` para `src/messages/`
2. ✅ **Mesclar traduções** com arquivos existentes (não sobrescrever!)
3. ✅ Atualizar `app/not-found.tsx` e `app/error.tsx` com versões i18n
4. ✅ Adicionar scripts ao `package.json`
5. ✅ Testar em ambos os idiomas (pt-BR e en)

### Melhorias Futuras

#### 1. **Health Check Avançado**
   - Adicionar checks de database
   - Verificar conectividade com APIs externas
   - Incluir métricas de performance

#### 2. **Monitoring**
   - Integrar com Sentry para error tracking
   - Dashboard de health metrics
   - Alertas automáticos

#### 3. **Testes Adicionais**
   - Smoke test do home page
   - Validação de assets (CSS/JS)
   - Testes de performance

#### 4. **i18n Expandido**
   - Adicionar mais idiomas (es, fr, de)
   - Implementar i18n em todos os domínios
   - Criar script de validação de traduções
   - Implementar fallback para chaves faltantes

---

**Implementação completa! 🎉**