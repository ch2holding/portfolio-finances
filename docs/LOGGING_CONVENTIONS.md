# 📝 Convenções de Logging - Finance AI

## 🎯 Objetivo

Padronizar o uso de logs na aplicação para facilitar debugging, monitoramento e auditoria, mantendo a segurança dos dados dos usuários.

---

## 📊 Níveis de Log

### 🔵 DEBUG (Desenvolvimento apenas)

**Quando usar:**
- Valores de variáveis durante execução
- Fluxo detalhado de funções
- Dados de debug temporários
- Investigação de bugs

**Onde usar:**
- Código em desenvolvimento
- Investigação de problemas específicos
- NUNCA em produção (automaticamente desabilitado)

**Exemplos:**
```typescript
// ✅ Bom uso
logger.debug("Fetching user data", { userId, params });
logger.debug("Cache hit", { key, ttl });

// ❌ Evitar
logger.debug("User password: " + password); // Dados sensíveis!
```

---

### 🟢 INFO (Informativo)

**Quando usar:**
- Eventos importantes da aplicação
- Início/fim de operações críticas
- Mudanças de estado significativas
- Sucesso em operações importantes

**Onde usar:**
- Autenticação de usuários
- Criação/edição de registros importantes
- Processamento de transações
- Integrações externas bem-sucedidas

**Exemplos:**
```typescript
// ✅ Bom uso
logger.info("User logged in", { userId, method: "google" });
logger.info("Transaction created", { transactionId, amount });
logger.info("Budget limit reached", { budgetId, userId });

// ❌ Evitar
logger.info("Button clicked"); // Muito granular
logger.info("Rendering component"); // Ruído desnecessário
```

---

### 🟡 WARN (Aviso)

**Quando usar:**
- Situações anormais mas recuperáveis
- Uso de fallbacks
- Comportamento não esperado (mas não erro)
- Deprecations
- Limites se aproximando

**Onde usar:**
- Chamadas de API lentas
- Dados faltando (mas com valor default)
- Uso de recursos quase no limite
- Configurações não ideais

**Exemplos:**
```typescript
// ✅ Bom uso
logger.warn("API response slow", { endpoint, duration: 5000 });
logger.warn("Using fallback value", { field: "currency", default: "BRL" });
logger.warn("Budget at 90%", { budgetId, usage: 0.9 });

// ❌ Evitar
logger.warn("User not found"); // Isso é um erro, não aviso
```

---

### 🔴 ERROR (Erro)

**Quando usar:**
- Exceções não tratadas
- Falhas em operações críticas
- Erros de validação importantes
- Problemas de integração

**Onde usar:**
- Try/catch blocks
- Validações que falham
- Problemas de banco de dados
- Erros de API externa
- Problemas de autenticação/autorização

**Exemplos:**
```typescript
// ✅ Bom uso
try {
  await createTransaction(data);
} catch (error) {
  logger.error("Failed to create transaction", error, {
    userId,
    data: sanitize(data),
  });
  throw error;
}

// ✅ Com contexto rico
logger.error("Database connection failed", error, {
  component: "TransactionRepository",
  operation: "findAll",
  retryCount: 3,
});

// ❌ Evitar
logger.error("Error"); // Sem contexto
logger.error(error.message); // Perdeu o stack trace
```

---

## 📍 Onde Logar

### ✅ **SEMPRE logar em:**

#### 1. API Routes
```typescript
// app/api/transactions/route.ts
export async function POST(request: Request) {
  try {
    logger.info("Creating transaction", { userId });
    
    const result = await transactionService.create(data);
    
    logger.info("Transaction created", { 
      transactionId: result.id,
      userId 
    });
    
    return NextResponse.json(result);
  } catch (error) {
    logger.error("Failed to create transaction", error, { userId });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

#### 2. Domain Services (Regras de Negócio)
```typescript
// domain/transactions/services/transaction.service.ts
export class TransactionService {
  async create(dto: CreateTransactionDTO) {
    logger.info("TransactionService.create called", { 
      userId: dto.userId 
    });
    
    try {
      // Validação
      const validated = validateTransaction(dto);
      
      // Persistência
      const transaction = await this.repository.create(validated);
      
      logger.info("Transaction persisted", { 
        transactionId: transaction.id 
      });
      
      return transaction;
    } catch (error) {
      logger.error("Transaction creation failed", error, {
        component: "TransactionService",
        operation: "create",
      });
      throw error;
    }
  }
}
```

#### 3. Repositories (Acesso a Dados)
```typescript
// domain/transactions/repositories/transaction.repository.ts
export class TransactionRepository {
  async findAll(userId: string) {
    logger.debug("TransactionRepository.findAll", { userId });
    
    try {
      const snapshot = await this.collection
        .where("userId", "==", userId)
        .get();
      
      logger.info("Transactions fetched", { 
        userId, 
        count: snapshot.size 
      });
      
      return this.mapDocs(snapshot);
    } catch (error) {
      logger.error("Failed to fetch transactions", error, {
        component: "TransactionRepository",
        userId,
      });
      throw error;
    }
  }
}
```

#### 4. Integrações Externas
```typescript
// lib/external/api-client.ts
export async function callExternalAPI(endpoint: string) {
  logger.info("Calling external API", { endpoint });
  
  const startTime = Date.now();
  
  try {
    const response = await fetch(endpoint);
    const duration = Date.now() - startTime;
    
    if (duration > 3000) {
      logger.warn("Slow API response", { endpoint, duration });
    }
    
    logger.info("API call successful", { endpoint, duration });
    return response.json();
  } catch (error) {
    logger.error("API call failed", error, { endpoint });
    throw error;
  }
}
```

#### 5. Operações Críticas de Negócio
```typescript
// domain/budgets/services/budget.service.ts
export class BudgetService {
  async checkLimit(budgetId: string, amount: number) {
    const budget = await this.repository.findById(budgetId);
    const used = await this.calculateUsed(budgetId);
    const percentage = used / budget.limit;
    
    if (percentage >= 0.9) {
      logger.warn("Budget limit approaching", {
        budgetId,
        percentage,
        userId: budget.userId,
      });
    }
    
    if (percentage >= 1.0) {
      logger.error("Budget limit exceeded", undefined, {
        budgetId,
        limit: budget.limit,
        used,
        userId: budget.userId,
      });
    }
  }
}
```

---

### ❌ **NUNCA logar em:**

#### 1. Client Components (use console.log)
```typescript
// ❌ ERRADO - Client Component
"use client";
import { logger } from "@/lib/logger"; // Não funciona no client!

export function Component() {
  logger.info("Component rendered"); // ERRO!
  
  // ✅ CORRETO
  console.log("Component rendered");
}
```

#### 2. Loops ou Operações Frequentes
```typescript
// ❌ ERRADO - Muitos logs
users.forEach(user => {
  logger.info("Processing user", { userId: user.id }); // Poluição!
});

// ✅ CORRETO - Log resumido
logger.info("Processing users", { count: users.length });
users.forEach(user => processUser(user));
logger.info("Users processed", { count: users.length });
```

#### 3. Informações Sensíveis SEM Sanitização
```typescript
// ❌ ERRADO - Dados sensíveis
logger.info("User data", { password, creditCard, ssn });

// ✅ CORRETO - Sanitizado
logger.info("User data", sanitize({ password, creditCard, ssn }));
// Resultado: { password: "[REDACTED]", ... }
```

---

## 🔒 Sanitização de Dados

### Campos Automaticamente Sanitizados

O logger sanitiza automaticamente:
- `password`, `senha`
- `token`, `accessToken`, `refreshToken`
- `apiKey`, `secret`, `privateKey`
- `creditCard`, `cvv`, `ssn`, `cpf`
- `authorization`, `cookie`, `session`

### Uso Manual de Sanitização

```typescript
import { sanitize } from "@/lib/logger";

// Sanitizar objeto antes de logar
const userData = {
  name: "João",
  email: "joao@email.com",
  password: "123456",
  token: "abc123token",
};

logger.info("User registered", sanitize(userData));
// Output: { name: "João", email: "joao@email.com", password: "[REDACTED]", token: "[REDACTED]" }
```

---

## 📦 Contexto Adicional

### Logger com Contexto Fixo

Útil para manter contexto consistente:

```typescript
// Criar logger com userId fixo
const userLogger = createUserLogger(userId);

userLogger.info("Operation started");
userLogger.info("Operation completed");
// Ambos incluem { userId } automaticamente
```

### Logger com Contexto de Request

Para API routes:

```typescript
export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  const userId = await getUserId(request);
  
  const reqLogger = createRequestLogger(requestId, userId);
  
  reqLogger.info("Request received");
  reqLogger.info("Processing data");
  reqLogger.info("Request completed");
  // Todos incluem { requestId, userId }
}
```

---

## 🎯 Exemplos Práticos

### Exemplo Completo: Criar Transação

```typescript
// app/api/transactions/route.ts
import { logger, createRequestLogger } from "@/lib/logger";
import { safeError } from "@/lib/safe-error";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const userId = await getUserId(request);
  const reqLogger = createRequestLogger(requestId, userId);
  
  reqLogger.info("POST /api/transactions - Start");
  
  try {
    // Parsear body
    const body = await request.json();
    reqLogger.debug("Request body parsed", { body: sanitize(body) });
    
    // Validar
    const validated = transactionSchema.parse(body);
    reqLogger.debug("Validation passed");
    
    // Criar transação
    const transaction = await transactionService.create(validated);
    reqLogger.info("Transaction created successfully", {
      transactionId: transaction.id,
    });
    
    return NextResponse.json(transaction);
  } catch (error) {
    reqLogger.error("Failed to create transaction", error);
    
    const safe = safeError(error);
    return NextResponse.json(
      { error: safe.message },
      { status: safe.statusCode || 500 }
    );
  }
}
```

---

## 🚨 Erros Comuns

### ❌ 1. Logar sem contexto
```typescript
logger.error("Error occurred"); // Sem informação útil!
```

### ✅ Correto
```typescript
logger.error("Failed to fetch user data", error, {
  userId,
  component: "UserRepository",
  operation: "findById",
});
```

---

### ❌ 2. Expor dados sensíveis
```typescript
logger.info("Login attempt", { email, password }); // NUNCA!
```

### ✅ Correto
```typescript
logger.info("Login attempt", { email }); // Apenas email, sem password
// OU
logger.info("Login attempt", sanitize({ email, password }));
```

---

### ❌ 3. Log no lugar errado
```typescript
"use client";
import { logger } from "@/lib/logger"; // Erro no client!
```

### ✅ Correto
```typescript
// Server Component ou API Route
import { logger } from "@/lib/logger"; // OK!
```

---

## 📚 Checklist de Logging

Antes de fazer commit, verifique:

- [ ] Logs têm contexto suficiente (userId, operação, etc)
- [ ] Dados sensíveis estão sanitizados
- [ ] Nível de log é apropriado
- [ ] Logger usado apenas em server-side
- [ ] Erros incluem stack trace (desenvolvimento)
- [ ] Operações críticas têm logs de início/fim
- [ ] Logs em produção não poluem demais

---

## 🔧 Integração Futura

O sistema está preparado para integração com:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - APM e logs
- **CloudWatch** - AWS logs
- **Vercel Analytics** - Métricas

Adicione no logger.ts:
```typescript
if (isProduction()) {
  Sentry.captureException(error, { contexts: { log: entry } });
}
```

---

## 📖 Referências

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Best Practices for Logging](https://betterstack.com/community/guides/logging/javascript-logging-best-practices/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)