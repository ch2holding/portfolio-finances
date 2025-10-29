# 🔥 Firebase & Firestore - Arquitetura

## 📖 Visão Geral

O Finance AI usa Firebase para autenticação e Firestore como banco de dados NoSQL. A arquitetura é dividida em **dois módulos separados** para garantir compatibilidade com SSR (Server-Side Rendering) do Next.js.

## 🏗️ Estrutura de Módulos
```
src/lib/firebase/
├── firestore.client.ts    # Firebase Client SDK (browser)
├── firestore.admin.ts     # Firebase Admin SDK (servidor)
└── types.ts               # Tipos compartilhados
```

### Client Module (`firestore.client.ts`)

**Uso:** Componentes React, Client Components

**Características:**
- Marcado com `'use client'`
- Usa SDK do Firebase (`firebase/firestore`)
- Roda apenas no browser
- Variáveis de ambiente públicas (`NEXT_PUBLIC_*`)

**Exemplo:**
```typescript
'use client';
import { db } from '@/lib/firebase/firestore.client';
import { collection, getDocs } from 'firebase/firestore';

export function MyComponent() {
  const fetchData = async () => {
    const snapshot = await getDocs(collection(db, 'transactions'));
    // ...
  };
}
```

### Admin Module (`firestore.admin.ts`)

**Uso:** API Routes, Server Components, Domain Repositories

**Características:**
- Server-only (sem `'use client'`)
- Usa Firebase Admin SDK (`firebase-admin`)
- Roda apenas no servidor
- Variáveis de ambiente privadas (sem `NEXT_PUBLIC_`)

**Exemplo:**
```typescript
import { adminDb } from '@/lib/firebase/firestore.admin';

export class TransactionRepository {
  async findAll() {
    const snapshot = await adminDb.collection('transactions').get();
    // ...
  }
}
```

## ⚠️ Regras Críticas

### ❌ NUNCA Faça Isso:
```typescript
// ❌ ERRADO - Importar client no servidor
import { db } from '@/lib/firebase/firestore.client';

export async function GET() {
  const docs = await db.collection('users').get(); // Vai quebrar no servidor!
}
```
```typescript
// ❌ ERRADO - Importar admin no client
'use client';
import { adminDb } from '@/lib/firebase/firestore.admin';

export function Component() {
  // Credenciais privadas vazam para o browser!
}
```

### ✅ Faça Isso:
```typescript
// ✅ CORRETO - Client no browser
'use client';
import { db } from '@/lib/firebase/firestore.client';

// ✅ CORRETO - Admin no servidor
import { adminDb } from '@/lib/firebase/firestore.admin';
```

## 🔒 Segurança

### Variáveis de Ambiente

**Públicas (Client):**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```
- Expostas no browser
- Seguras para compartilhar
- Protegidas por regras do Firestore

**Privadas (Admin):**
```env
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
```
- Apenas no servidor
- NUNCA vazam para o client
- Acesso total ao Firestore

### Regras do Firestore

As regras de segurança do Firestore protegem os dados mesmo com credenciais públicas expostas.

Exemplo de regras básicas:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Usuários só acessam seus próprios dados
    match /transactions/{transactionId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📂 Estrutura de Dados

### Coleções Principais
```
firestore/
├── users/
│   └── {userId}/
│       ├── profile
│       └── settings
├── accounts/
│   └── {accountId}/
│       ├── name
│       ├── type
│       └── userId
├── transactions/
│   └── {transactionId}/
│       ├── amount
│       ├── description
│       ├── accountId
│       └── userId
└── budgets/
    └── {budgetId}/
        ├── category
        ├── limit
        └── userId
```

## 🎯 Padrões de Uso

### Repository Pattern

Sempre use repositories para acessar Firestore:
```typescript
// Domain Repository (Server-only)
import { adminDb } from '@/lib/firebase/firestore.admin';

export class TransactionRepository {
  private collection = adminDb.collection('transactions');

  async findByUserId(userId: string) {
    const snapshot = await this.collection
      .where('userId', '==', userId)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
```

### Timestamps

Use os helpers para trabalhar com timestamps:
```typescript
import { timestampHelpers } from '@/lib/firebase/types';

const transaction = {
  amount: 100,
  createdAt: timestampHelpers.now(),
};
```

## 🚀 Desenvolvimento Local

### Emuladores (Opcional)

Para desenvolvimento local sem afetar produção:
```bash
# Instalar emuladores
firebase init emulators

# Adicionar no .env.local
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true

# Iniciar emuladores
firebase emulators:start
```

## 📚 Referências

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js + Firebase](https://firebase.google.com/docs/app-hosting/frameworks/nextjs)