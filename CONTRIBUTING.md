# 🤝 Guia de Contribuição - Finance AI

Obrigado por considerar contribuir para o Finance AI! Este documento contém diretrizes para garantir qualidade e consistência no código.

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Contribuir](#como-contribuir)
3. [Padrões de Branch](#padrões-de-branch)
4. [Convenção de Commits](#convenção-de-commits)
5. [Pull Requests](#pull-requests)
6. [Padrões de Código](#padrões-de-código)
7. [Arquitetura e Organização](#arquitetura-e-organização)

---

## 🌟 Código de Conduta

Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/). Esperamos que todos os contribuidores:

- Sejam respeitosos e inclusivos
- Aceitem críticas construtivas
- Priorizem o bem do projeto
- Demonstrem empatia com outros membros

---

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork localmente
git clone https://github.com/seu-usuario/finance-ai.git
cd finance-ai

# Adicione o repositório original como upstream
git remote add upstream https://github.com/finance-ai/finance-ai.git
```

### 2. Mantenha-se Atualizado

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 3. Crie uma Branch

```bash
# Veja a seção "Padrões de Branch" abaixo
git checkout -b feat/FIN-123-adicionar-filtro-transacoes
```

### 4. Faça suas Alterações

Siga os [Padrões de Código](#padrões-de-código) e [Arquitetura](#arquitetura-e-organização).

### 5. Commit com Convenção

```bash
git add .
git commit -m "feat(transactions): adicionar filtro por categoria [FIN-123]"
```

### 6. Push e Abra PR

```bash
git push origin feat/FIN-123-adicionar-filtro-transacoes
# Abra um Pull Request no GitHub
```

---

## 🌿 Padrões de Branch

### Nomenclatura

```
<tipo>/<ISSUE_ID>-<descricao-curta>
```

### Tipos de Branch

| Tipo       | Descrição                          | Exemplo                                      |
|------------|------------------------------------|----------------------------------------------|
| `feat/`    | Nova funcionalidade                | `feat/FIN-042-sistema-pontos`                |
| `fix/`     | Correção de bug                    | `fix/FIN-089-saldo-negativo`                 |
| `refactor/`| Refatoração sem mudar comportamento| `refactor/FIN-101-repository-pattern`        |
| `docs/`    | Documentação                       | `docs/FIN-012-adr-arquitetura`               |
| `test/`    | Adição/correção de testes          | `test/FIN-078-transaction-service`           |
| `chore/`   | Manutenção/configuração            | `chore/FIN-055-update-deps`                  |
| `perf/`    | Melhoria de performance            | `perf/FIN-091-otimizar-query-firestore`      |
| `style/`   | Formatação/estilo (sem lógica)     | `style/FIN-066-prettier-config`              |

### Regras

- ✅ Sempre prefixar com tipo (`feat/`, `fix/`, etc.)
- ✅ Incluir ID da issue/ticket quando disponível
- ✅ Usar kebab-case para descrição
- ✅ Descrição curta e objetiva (máx. 50 caracteres)
- ❌ Nunca commitar direto na `main`

### Exemplos

```bash
# ✅ Bom
git checkout -b feat/FIN-123-adicionar-filtro-transacoes
git checkout -b fix/FIN-456-corrigir-calculo-saldo
git checkout -b docs/FIN-789-documentar-ai-tools

# ❌ Ruim
git checkout -b nova-feature
git checkout -b fix
git checkout -b transacoes
```

---

## 💬 Convenção de Commits

Seguimos o padrão **Conventional Commits** com prefixo de issue.

### Formato

```
<tipo>(<escopo>): <descrição> [ISSUE_ID]

<corpo opcional>

<rodapé opcional>
```

### Tipos de Commit

| Tipo       | Descrição                                  |
|------------|--------------------------------------------|
| `feat`     | Nova funcionalidade                        |
| `fix`      | Correção de bug                            |
| `refactor` | Refatoração (sem mudar comportamento)      |
| `docs`     | Documentação                               |
| `test`     | Testes                                     |
| `chore`    | Manutenção/configuração                    |
| `perf`     | Melhoria de performance                    |
| `style`    | Formatação/estilo                          |
| `build`    | Build system/dependencies                  |
| `ci`       | Configuração de CI/CD                      |
| `revert`   | Reverter commit anterior                   |

### Escopos Comuns

- `accounts` - Contas bancárias
- `transactions` - Transações
- `budgets` - Orçamentos
- `investments` - Investimentos
- `ai` - Integração com IA
- `points` - Sistema de pontos
- `auth` - Autenticação
- `ui` - Interface do usuário
- `api` - API/backend
- `db` - Database/Firestore

### Regras

- ✅ Primeira linha: máximo 72 caracteres
- ✅ Tipo em lowercase
- ✅ Descrição no imperativo ("adicionar", não "adicionado")
- ✅ Incluir ID da issue no final entre colchetes
- ✅ Corpo opcional: explicar **o quê** e **por quê**, não **como**
- ❌ Não usar ponto final na descrição

### Exemplos

#### Commit Simples

```bash
git commit -m "feat(transactions): adicionar filtro por categoria [FIN-123]"
```

#### Commit com Corpo

```bash
git commit -m "refactor(repositories): implementar repository pattern [FIN-101]

Substituir acesso direto ao Firestore por repositories.
Isso facilita testes e futura migração para PostgreSQL.

Módulos afetados:
- accounts
- transactions
- budgets"
```

#### Commit de Breaking Change

```bash
git commit -m "feat(api): alterar formato de resposta da API [FIN-202]

BREAKING CHANGE: O campo 'createdAt' agora retorna ISO string ao invés de timestamp Unix.

Antes: { createdAt: 1698765432 }
Depois: { createdAt: '2025-10-31T10:30:00Z' }"
```

#### Outros Exemplos

```bash
# Feature
feat(budgets): adicionar alertas de orçamento excedido [FIN-345]

# Bug fix
fix(transactions): corrigir cálculo de saldo negativo [FIN-456]

# Documentação
docs(core): adicionar ADR sobre escolha de banco de dados [FIN-012]

# Refatoração
refactor(ai): extrair sanitizer para módulo separado [FIN-567]

# Testes
test(investments): adicionar testes unitários para calculateROI [FIN-678]

# Performance
perf(transactions): otimizar query de listagem por índice composto [FIN-789]

# Chore
chore(deps): atualizar dependências do Next.js para 15.0.2 [FIN-890]
```

---

## 🔀 Pull Requests

### Antes de Abrir um PR

- [ ] Código segue os [Padrões de Código](#padrões-de-código)
- [ ] Commits seguem a [Convenção de Commits](#convenção-de-commits)
- [ ] Testes passam localmente (`npm test`)
- [ ] Build de produção funciona (`npm run build`)
- [ ] Código está formatado (`npm run lint`)
- [ ] Documentação atualizada (se aplicável)

### Título do PR

Siga o mesmo formato dos commits:

```
<tipo>(<escopo>): <descrição> [ISSUE_ID]
```

**Exemplo:**
```
feat(transactions): adicionar filtro por categoria e data [FIN-123]
```

### Descrição do PR

Use o template abaixo:

```markdown
## 📋 Descrição

Breve descrição do que foi feito e por quê.

## 🎯 Issue Relacionada

Closes #123

## 🔄 Tipo de Mudança

- [ ] 🐛 Bug fix (correção de problema)
- [ ] ✨ Nova feature (adiciona funcionalidade)
- [ ] 💥 Breaking change (altera comportamento existente)
- [ ] 📝 Documentação
- [ ] ♻️ Refatoração
- [ ] ⚡ Performance
- [ ] ✅ Testes

## 🧪 Como Testar

Passos para reproduzir e validar:

1. ...
2. ...
3. ...

## 📸 Screenshots (se aplicável)

_Adicione screenshots/gifs de mudanças visuais_

## ✅ Checklist

- [ ] Código segue padrões do projeto
- [ ] Commits seguem convenção
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Build passa sem erros
- [ ] Sem warnings de lint
```

### Code Review

**Para revisores:**

- ✅ Verificar se segue arquitetura de domínios
- ✅ Validar que lógica está em `services/`, não na UI
- ✅ Garantir uso de Zod para validações
- ✅ Checar se código é SSR Safe
- ✅ Validar testes (quando aplicável)
- ✅ Sugerir melhorias de forma construtiva

**Para autores:**

- 🙏 Aceite críticas construtivas
- 🔄 Responda comentários rapidamente
- 💬 Explique decisões quando questionado
- ✏️ Faça alterações solicitadas

---

## 🎨 Padrões de Código

### TypeScript

- ✅ **Strict mode habilitado** (sem `any`, use `unknown` se necessário)
- ✅ **Interfaces para objetos públicos**, `type` para unions/helpers
- ✅ **Nomes descritivos** (`getUserTransactions`, não `getTrans`)
- ❌ **Sem `as any`** ou `@ts-ignore` sem justificativa

### Formatação

```bash
# Formatar código
npm run lint

# Verificar formatação
npm run lint:check
```

### Nomenclatura

| Tipo            | Convenção       | Exemplo                        |
|-----------------|-----------------|--------------------------------|
| Variáveis       | camelCase       | `totalBalance`, `userId`       |
| Constantes      | UPPER_SNAKE     | `MAX_TRANSACTIONS`, `API_URL`  |
| Funções         | camelCase       | `calculateBalance()`           |
| Classes         | PascalCase      | `TransactionService`           |
| Interfaces      | PascalCase + I  | `ITransactionRepository`       |
| Types           | PascalCase      | `CreateTransactionDTO`         |
| Enums           | PascalCase      | `TransactionType`              |
| Arquivos        | kebab-case      | `transaction-service.ts`       |

### Importações

```typescript
// 1. Dependências externas
import { z } from 'zod';
import { NextResponse } from 'next/server';

// 2. Módulos internos (domínios)
import { transactionService } from '@/domain/transactions';
import { accountRepository } from '@/domain/accounts';

// 3. Componentes e utils
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format';

// 4. Tipos
import type { Transaction } from '@/types/transaction';
```

### Comentários

```typescript
// ✅ Bom: explica "por quê", não "o quê"
// Usar Set para evitar duplicatas em O(1)
const uniqueIds = new Set(transactionIds);

// ❌ Ruim: óbvio e redundante
// Criar um Set com os IDs
const uniqueIds = new Set(transactionIds);

// ✅ Bom: JSDoc para funções públicas
/**
 * Calcula o saldo total de uma conta após uma transação.
 * @param accountId - ID da conta
 * @param transactionAmount - Valor da transação (positivo ou negativo)
 * @returns Novo saldo da conta
 * @throws {DomainError} Se conta não existir
 */
export async function calculateBalance(
  accountId: string,
  transactionAmount: number
): Promise<number> {
  // ...
}
```

---

## 🏗️ Arquitetura e Organização

### Princípios Fundamentais

1. **Domain Modules**: Organizar por domínio, não por tipo técnico
2. **Repository Pattern**: Nunca acessar Firestore diretamente
3. **SSR Safe**: Sem `window`, `document`, `localStorage` em domínios
4. **Zod Everywhere**: Validar todas as entradas externas
5. **Clean Architecture**: Lógica de negócio apenas em `services/`

### Estrutura de um Domínio

```
domain/transactions/
├── dto/
│   ├── create-transaction.dto.ts    # DTOs de entrada
│   └── transaction-response.dto.ts  # DTOs de saída
├── schemas/
│   ├── transaction.schema.ts        # Schemas Zod
│   └── filters.schema.ts
├── services/
│   └── transaction.service.ts       # Regras de negócio
├── repositories/
│   └── transaction.repository.ts    # Acesso a dados
├── api/
│   └── route.ts                     # Adaptador HTTP (Next.js)
├── types/
│   └── transaction.types.ts         # Tipos TypeScript
└── index.ts                         # API pública do módulo
```

### Onde Colocar Cada Tipo de Código

| Tipo de Código               | Onde Colocar                          |
|------------------------------|---------------------------------------|
| Validação de entrada         | `schemas/` (Zod)                      |
| Regras de negócio            | `services/`                           |
| Acesso ao Firestore          | `repositories/`                       |
| Adaptador HTTP               | `api/` (Next.js Route Handler)        |
| Componente React             | `components/` (fora do domínio)       |
| Função utilitária            | `utils/` (se global) ou `domain/utils` |
| Constantes                   | `domain/<nome>/constants.ts`          |
| Erros customizados           | `domain/<nome>/errors.ts`             |

### Exemplo Prático: Criar Nova Transação

❌ **ERRADO** (lógica na API):

```typescript
// app/api/transactions/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  
  // ❌ Validação manual
  if (!data.amount || data.amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }
  
  // ❌ Acesso direto ao Firestore
  const account = await db.collection('accounts').doc(data.accountId).get();
  
  // ❌ Lógica de negócio na API
  account.balance += data.amount;
  await account.update({ balance: account.balance });
  
  return NextResponse.json({ success: true });
}
```

✅ **CORRETO** (seguindo arquitetura):

```typescript
// domain/transactions/schemas/transaction.schema.ts
export const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  accountId: z.string().uuid(),
  category: z.string().min(1),
});

// domain/transactions/services/transaction.service.ts
export class TransactionService {
  async create(userId: string, dto: CreateTransactionDTO): Promise<Transaction> {
    // Validação já feita via Zod
    const account = await accountRepository.findById(dto.accountId, userId);
    
    if (!account) {
      throw new DomainError('ACCOUNT_NOT_FOUND', 'Conta não encontrada');
    }
    
    const transaction = await transactionRepository.create({
      ...dto,
      userId,
      createdAt: new Date(),
    });
    
    // Atualizar saldo
    await accountService.updateBalance(
      dto.accountId,
      dto.type === 'INCOME' ? dto.amount : -dto.amount
    );
    
    return transaction;
  }
}

// app/api/transactions/route.ts
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const data = createTransactionSchema.parse(body); // ✅ Validação Zod
    
    const transaction = await transactionService.create(session.user.id, data);
    
    return NextResponse.json(transaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof DomainError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### Regras de Importação entre Domínios

- ✅ **Domain → Domain** (se exportado via `index.ts`)
- ✅ **API → Domain**
- ✅ **UI → Domain** (apenas funções exportadas)
- ❌ **Domain → UI** (domínio não conhece UI)
- ❌ **Repository → Service** (apenas Service → Repository)

### SSR Safe: O Que Evitar

```typescript
// ❌ NUNCA em arquivos de domínio
if (typeof window !== 'undefined') { ... }
localStorage.setItem('key', 'value')
document.querySelector('#id')
window.location.href = '/path'

// ✅ Use apenas em componentes Client:
'use client'
import { useEffect, useState } from 'react'
```

---

## 🧪 Testes

### Estrutura

```
domain/transactions/
├── services/
│   └── transaction.service.ts
└── __tests__/
    └── transaction.service.test.ts
```

### Executar Testes

```bash
# Todos os testes
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Exemplo de Teste

```typescript
// domain/transactions/__tests__/transaction.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { transactionService } from '../services/transaction.service';
import { DomainError } from '@/domain/shared/errors';

describe('TransactionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar transação e atualizar saldo', async () => {
      const dto = {
        amount: 100,
        type: 'INCOME' as const,
        accountId: 'account-123',
        category: 'Salário',
      };

      const result = await transactionService.create('user-123', dto);

      expect(result).toMatchObject({
        amount: 100,
        type: 'INCOME',
        userId: 'user-123',
      });
    });

    it('deve lançar erro se conta não existir', async () => {
      const dto = {
        amount: 100,
        type: 'INCOME' as const,
        accountId: 'invalid-account',
        category: 'Salário',
      };

      await expect(
        transactionService.create('user-123', dto)
      ).rejects.toThrow(DomainError);
    });
  });
});
```

---

## 📚 Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Zod Documentation](https://zod.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**Obrigado por contribuir! 🚀**