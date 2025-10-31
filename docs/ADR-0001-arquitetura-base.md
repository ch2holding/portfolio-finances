# ADR-0001: Arquitetura Base do Finance AI

**Status:** Aceito  
**Data:** 2025-10-31  
**Decisores:** Time de Desenvolvimento Finance AI  
**Tags:** #arquitetura #fundamentos #modularização

---

## Contexto

O Finance AI é um sistema de controle financeiro pessoal com integração de IA. Precisávamos de uma arquitetura que suportasse:

- Escalabilidade modular (adicionar domínios sem quebrar o existente)
- Separação clara de responsabilidades
- Integração segura com LLM
- Facilidade de manutenção e testes
- SSR (Server-Side Rendering) sem riscos de vazamento de lógica client-side

**Problema:** Aplicações financeiras tendem a crescer de forma desorganizada, com lógica espalhada entre UI, API e banco de dados.

---

## Decisão

Adotamos uma **arquitetura modular baseada em domínios** inspirada em Clean Architecture e Domain-Driven Design (DDD), com as seguintes escolhas:

### 1. **Domain Modules (Organização por Domínio)**

```
src/domain/
  accounts/       # Gestão de contas bancárias
  transactions/   # Transações financeiras
  budgets/        # Orçamentos e metas
  investments/    # Gestão de investimentos
  points/         # Sistema de gamificação
  ai/             # Integração com IA
```

**Cada domínio contém:**
- `dto/` - Contratos de entrada/saída
- `schemas/` - Validação com Zod
- `services/` - Regras de negócio (nunca acessa Firestore diretamente)
- `repositories/` - Camada de persistência (Repository Pattern)
- `api/` - Adaptadores HTTP (Next.js Route Handlers)
- `index.ts` - API pública do módulo

**Razão:** Isolamento de domínios facilita manutenção, testes e evita acoplamento.

---

### 2. **Repository Pattern para Firestore**

UI e API **nunca acessam Firestore diretamente**. Todo acesso passa por repositories.

```typescript
// ❌ Errado: acesso direto
const accounts = await db.collection('accounts').get();

// ✅ Correto: via repository
const accounts = await accountRepository.findByUserId(userId);
```

**Razão:** Facilita troca de banco de dados no futuro (ex.: migração para Postgres).

---

### 3. **Escolha do Firestore (por enquanto)**

**Decisão:** Iniciar com Firebase Firestore.

**Prós:**
- Rápido para MVP
- Real-time built-in
- Infraestrutura gerenciada
- Sem custo inicial alto

**Contras:**
- Queries limitadas (sem joins complexos)
- Custo escala com reads/writes
- Vendor lock-in

**Plano Futuro:** Migrar para **PostgreSQL** quando houver:
- Necessidade de queries complexas
- Volume alto de dados
- Maior controle sobre custos

**Como o Repository Pattern ajuda:** A troca será transparente para os Domain Services.

---

### 4. **SSR Safe (Sem window/document em Domain)**

Todo código de domínio é **SSR Safe**:
- ❌ Não pode usar `window`, `document`, `localStorage`
- ❌ Não pode usar hooks React (`useState`, `useEffect`)
- ✅ Pode rodar tanto no servidor quanto no cliente

**Razão:** Garante que lógica de negócio funcione em Server Components, API Routes e testes Node.js.

---

### 5. **Zod Everywhere (Validação em Tempo de Execução)**

Toda entrada externa (forms, API requests, LLM responses) é validada com Zod.

```typescript
// dto/create-transaction.dto.ts
export const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  accountId: z.string().uuid(),
});

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
```

**Razão:** TypeScript valida em tempo de compilação, mas Zod valida em runtime (protege contra dados corrompidos).

---

### 6. **AI Tools Layer (Segurança com LLM)**

A IA **nunca acessa dados diretamente**. Fluxo obrigatório:

```
User Input → Sanitizer → AI Service → LLM Tools → Domain Services → Repository
```

**LLM Tools** são funções especiais que:
- Validam entrada com Zod
- Chamam Domain Services
- Retornam dados estruturados (nunca expõem dados sensíveis desnecessários)

**Razão:** Previne prompt injection e vazamento de dados.

---

### 7. **Domain Services: Única Fonte de Lógica de Negócio**

Toda regra de negócio está em `services/`.

**Exemplos:**
- `transactionService.create()` - valida, cria transação, atualiza saldo
- `budgetService.checkOverspending()` - verifica se ultrapassou orçamento
- `investmentService.calculateROI()` - calcula retorno

**UI e API apenas orquestram**, nunca contêm lógica.

```typescript
// ❌ Errado: lógica na API
export async function POST(req: Request) {
  const data = await req.json();
  const account = await db.collection('accounts').doc(data.accountId).get();
  account.balance += data.amount; // ❌ regra de negócio aqui
  await account.update({ balance: account.balance });
}

// ✅ Correto: API chama serviço
export async function POST(req: Request) {
  const data = createTransactionSchema.parse(await req.json());
  await transactionService.create(userId, data);
  return NextResponse.json({ success: true });
}
```

---

### 8. **DomainError para Exceções Tipadas**

Usamos `DomainError` para erros de negócio:

```typescript
throw new DomainError('INSUFFICIENT_BALANCE', 'Saldo insuficiente');
```

**Razão:** Permite tratamento tipado de erros (ex.: mostrar mensagem específica na UI).

---

## Consequências

### ✅ Positivas
- Código testável e desacoplado
- Fácil adicionar novos domínios
- Preparado para trocar banco de dados
- Segurança com IA garantida
- Manutenção simplificada

### ⚠️ Negativas
- Curva de aprendizado inicial
- Mais arquivos/pastas (mas organizados)
- Desenvolvedores precisam seguir padrões rigorosamente

### 📌 Mitigações
- Documentação clara (este ADR + README)
- Code reviews rigorosos
- Exemplos de código em cada domínio

---

## Notas Técnicas

- **Stack:** Next.js 15 (App Router), TypeScript, Firestore, NextAuth, Tailwind, shadcn/ui
- **Padrões:** Clean Architecture, Repository Pattern, Domain-Driven Design
- **Segurança:** Validação Zod, AI Tools Layer, SSR Safe

---

## Links Relacionados

- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

**Próximos ADRs:**
- ADR-0002: Estratégia de Autenticação (NextAuth + JWT)
- ADR-0003: Escolha de UI (shadcn/ui + Tailwind)
- ADR-0004: Sistema de Pontos e Gamificação