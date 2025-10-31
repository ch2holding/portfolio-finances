# 🤖 Finance AI

> Sistema inteligente de controle financeiro pessoal com integração de IA

---

## 📋 Sobre o Projeto

O **Finance AI** é uma aplicação moderna de gestão financeira pessoal que utiliza Inteligência Artificial para ajudar usuários a:

- 📊 Gerenciar contas bancárias e transações
- 💰 Criar e acompanhar orçamentos
- 📈 Monitorar investimentos
- 🎯 Atingir metas financeiras
- 🤖 Receber insights inteligentes via IA
- 🎮 Gamificar hábitos financeiros saudáveis

---

## 🏗️ Arquitetura

O Finance AI segue uma **arquitetura modular baseada em domínios** (Domain Modules), inspirada em Clean Architecture e Domain-Driven Design.

### Princípios Fundamentais

1. **Domain Modules**: Código organizado por domínio, não por tipo técnico
2. **Repository Pattern**: Isolamento da camada de dados
3. **SSR Safe**: Sem dependências client-side em lógica de negócio
4. **Zod Everywhere**: Validação em runtime de todas as entradas
5. **AI Tools Layer**: Integração segura com LLM
6. **Clean Architecture**: Separação clara de responsabilidades

> 📖 **Decisões Arquiteturais:** Veja [docs/ADR-0001-arquitetura-base.md](./docs/ADR-0001-arquitetura-base.md)

---

## 📦 Módulos de Domínio

### 🏦 **Accounts** (Contas Bancárias)
Gerenciamento de contas bancárias do usuário.

**Responsabilidades:**
- CRUD de contas (Conta Corrente, Poupança, Carteira Digital)
- Cálculo de saldo consolidado
- Histórico de saldos

**Serviços principais:**
- `accountService.create()` - Criar nova conta
- `accountService.getBalance()` - Obter saldo atual
- `accountService.listByUser()` - Listar contas do usuário

**Schemas:**
- `createAccountSchema` - Validação de criação
- `updateAccountSchema` - Validação de atualização

---

### 💸 **Transactions** (Transações)
Gestão de receitas e despesas.

**Responsabilidades:**
- Registro de transações (INCOME/EXPENSE)
- Categorização automática (via IA)
- Atualização de saldo das contas
- Filtragem e busca avançada

**Serviços principais:**
- `transactionService.create()` - Criar transação e atualizar saldo
- `transactionService.listByPeriod()` - Buscar por período
- `transactionService.categorize()` - Categorizar com IA

**Schemas:**
- `createTransactionSchema` - Validação de criação
- `transactionFilterSchema` - Validação de filtros

---

### 🎯 **Budgets** (Orçamentos)
Controle de orçamentos mensais por categoria.

**Responsabilidades:**
- Criação de orçamentos mensais
- Monitoramento de gastos vs. orçado
- Alertas de excesso de gastos
- Sugestões de economia

**Serviços principais:**
- `budgetService.create()` - Criar orçamento
- `budgetService.checkOverspending()` - Verificar se ultrapassou
- `budgetService.getSuggestions()` - Sugestões da IA

**Schemas:**
- `createBudgetSchema` - Validação de criação
- `budgetProgressSchema` - Validação de progresso

---

### 📈 **Investments** (Investimentos)
Gestão de carteira de investimentos.

**Responsabilidades:**
- Registro de ativos (ações, FIIs, renda fixa)
- Cálculo de rentabilidade (ROI)
- Acompanhamento de dividendos
- Sugestões de diversificação

**Serviços principais:**
- `investmentService.create()` - Adicionar investimento
- `investmentService.calculateROI()` - Calcular retorno
- `investmentService.getDiversificationSuggestions()` - Sugestões IA

**Schemas:**
- `createInvestmentSchema` - Validação de criação
- `investmentPerformanceSchema` - Validação de performance

---

### 🤖 **AI** (Inteligência Artificial)
Integração com LLM para insights financeiros.

**Responsabilidades:**
- Análise de padrões de gastos
- Sugestões personalizadas
- Categorização automática de transações
- Respostas a perguntas financeiras

**Serviços principais:**
- `aiService.generateInsights()` - Gerar insights
- `aiService.chat()` - Chat financeiro
- `aiService.categorizeTransaction()` - Categorizar

**LLM Tools disponíveis:**
- `getFinancialSummaryTool` - Resumo financeiro
- `analyzeSpendingPatternsTool` - Análise de padrões
- `suggestBudgetAdjustmentsTool` - Sugestões de orçamento

---

### 🎮 **Points** (Gamificação)
Sistema de pontuação e conquistas.

**Responsabilidades:**
- Atribuição de pontos por ações
- Sistema de conquistas (achievements)
- Ranking de usuários
- Recompensas por metas

**Serviços principais:**
- `pointsService.award()` - Conceder pontos
- `pointsService.checkAchievements()` - Verificar conquistas
- `pointsService.getRanking()` - Obter ranking

**Schemas:**
- `awardPointsSchema` - Validação de pontuação
- `achievementSchema` - Validação de conquistas

---

## 🛠️ Stack Tecnológica

### Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Autenticação:** [NextAuth.js](https://next-auth.js.org/) (JWT)

### UI/UX
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/)
- **Ícones:** [Lucide Icons](https://lucide.dev/)

### Validação e Tipos
- **Validação Runtime:** [Zod](https://zod.dev/)
- **Type Safety:** TypeScript strict mode

### IA
- **LLM:** Anthropic Claude (via API)
- **Prompt Engineering:** Custom AI Tools Layer

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Firebase Project configurado
- Chave API do Anthropic Claude

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais
```

### Variáveis de Ambiente Necessárias

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Anthropic Claude
ANTHROPIC_API_KEY=
```

### Executar em Desenvolvimento

```bash
npm run dev
# Aplicação rodará em http://localhost:3000
```

### Build de Produção

```bash
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
finance-ai/
├── src/
│   ├── domain/              # Módulos de domínio
│   │   ├── accounts/        # Contas bancárias
│   │   ├── transactions/    # Transações
│   │   ├── budgets/         # Orçamentos
│   │   ├── investments/     # Investimentos
│   │   ├── ai/              # IA
│   │   └── points/          # Gamificação
│   ├── app/                 # Next.js App Router
│   ├── components/          # Componentes React
│   ├── utils/               # Utilitários
│   └── types/               # Tipos globais
├── docs/                    # Documentação
│   └── ADR-0001-*.md        # Architectural Decision Records
├── CONTRIBUTING.md          # Guia de contribuição
└── README.md                # Este arquivo
```

---

## 🔧 Troubleshooting

### Health Check

A aplicação possui um endpoint de health check para verificar se está funcionando:

```bash
curl http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "env": "development",
  "timestamp": "2025-10-31T10:30:00.000Z"
}
```

### Smoke Test

Execute o smoke test para verificar a saúde da aplicação:

```bash
npm run smoke
```

Este script valida:
- ✅ Health endpoint responde corretamente
- ✅ Status é "ok"
- ✅ Estrutura da resposta está correta
- ✅ Timestamp é válido

### Problemas Comuns

#### ❌ Erro: "Missing required environment variable"

**Solução:**
1. Verifique se o arquivo `.env.local` existe
2. Confirme que todas as variáveis obrigatórias estão preenchidas
3. Reinicie o servidor: `npm run dev`

#### ❌ Erro: "Firebase Private Key inválida"

**Solução:**
1. Certifique-se de que a chave mantém as quebras de linha (`\n`)
2. Coloque a chave entre aspas duplas no `.env.local`
3. Não remova os marcadores `BEGIN/END PRIVATE KEY`

#### ❌ Página 404 aparece em rotas que deveriam existir

**Solução:**
1. Verifique se a rota está definida em `app/`
2. Reinicie o servidor de desenvolvimento
3. Limpe o cache: `rm -rf .next && npm run dev`

#### ❌ Erro genérico (500) aparece

**Solução:**
1. Verifique os logs do console para detalhes
2. Em desenvolvimento, a página de erro mostra detalhes
3. Verifique se todas as variáveis de ambiente estão corretas
4. Rode o smoke test: `npm run smoke`

#### ❌ SSR Safety Error em código de domínio

**Solução:**
O código de domínio deve ser SSR-safe (sem `window`, `document`, `localStorage`).

Execute a verificação:
```bash
npm run check:ssr
```

Se encontrar erros, mova o código dependente de browser para componentes UI.

---

## 📖 Documentação Adicional

- [ADR-0001: Arquitetura Base](./docs/ADR-0001-arquitetura-base.md)
- [Guia de Domain Modules](./docs/domain-modules-guide.md) _(em breve)_
- [Integração com IA](./docs/ai-integration.md) _(em breve)_

---

## 👨‍💻 Autor

Projeto desenvolvido como parte do meu portfolio pessoal.

---

**Última atualização:** 31 de Outubro de 2025