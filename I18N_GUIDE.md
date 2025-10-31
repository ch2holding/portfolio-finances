# 🌍 Guia de Internacionalização (i18n) - Finance AI

## 📋 Estrutura de i18n

O Finance AI usa **next-intl** para internacionalização com suporte para:
- 🇧🇷 **pt-BR** (Português - Brasil) - idioma padrão
- 🇺🇸 **en** (English)

---

## 🗂️ Organização dos Arquivos

```
src/
├── i18n/
│   ├── config.ts              # Configuração de locales
│   ├── messages.ts            # Mapa de mensagens
│   └── request.ts             # Configuração de requisição
├── messages/
│   ├── pt-BR.json            # Traduções em português
│   └── en.json               # Traduções em inglês
├── services/
│   └── locale.ts             # Serviço de locale (get/set)
└── components/base/
    ├── i18nProvider.tsx      # Provider de i18n
    └── LocaleSwitcherSelect.tsx  # Seletor de idioma
```

---

## 📝 Estrutura dos Arquivos de Tradução

### Hierarquia Padrão

```json
{
  "errors": {
    "notFound": {
      "title": "...",
      "description": "...",
      "actions": {
        "goHome": "...",
        "goBack": "..."
      }
    }
  }
}
```

### Convenções de Nomenclatura

#### 1. Categorias Principais

```json
{
  "common": {},        // Textos comuns (botões, labels)
  "dashboard": {},     // Específico do dashboard
  "errors": {},        // Páginas de erro
  "health": {},        // Health check
  "accounts": {},      // Domínio: Contas
  "transactions": {}, // Domínio: Transações
  "budgets": {},      // Domínio: Orçamentos
  "investments": {},  // Domínio: Investimentos
  "ai": {},           // Domínio: IA
  "points": {}        // Domínio: Pontos
}
```

#### 2. Subcategorias Comuns

```json
{
  "module": {
    "title": "...",           // Títulos
    "description": "...",     // Descrições
    "labels": {},            // Labels de campos
    "placeholders": {},      // Placeholders de inputs
    "actions": {},           // Ações (botões)
    "messages": {            // Mensagens do sistema
      "success": {},
      "error": {},
      "warning": {},
      "info": {}
    },
    "validation": {}         // Mensagens de validação
  }
}
```

---

## 🔧 Como Usar i18n

### 1. Server Components (SSR)

```tsx
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("errors.notFound");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <button>{t("actions.goHome")}</button>
    </div>
  );
}
```

### 2. Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
```

### 3. Com Interpolação de Variáveis

**JSON:**
```json
{
  "welcome": "Bem-vindo, {name}!",
  "balance": "Seu saldo é {amount}"
}
```

**Componente:**
```tsx
const t = useTranslations("dashboard");

<h1>{t("welcome", { name: "João" })}</h1>
<p>{t("balance", { amount: formatCurrency(1000) })}</p>
```

### 4. Pluralização

**JSON:**
```json
{
  "transactions": {
    "count": "{count, plural, =0 {Nenhuma transação} =1 {1 transação} other {# transações}}"
  }
}
```

**Componente:**
```tsx
const t = useTranslations("transactions");

<p>{t("count", { count: 5 })}</p>
// Output: "5 transações"
```

---

## 📦 Novas Traduções Adicionadas

### Páginas de Erro (errors.*)

#### `errors.notFound` (404)

```json
{
  "errors": {
    "notFound": {
      "title": "Página não encontrada",
      "description": "A página que você está procurando não existe ou foi movida.",
      "actions": {
        "goHome": "Ir para Home",
        "goBack": "Voltar"
      },
      "supportText": {
        "prefix": "Se você acredita que isso é um erro,",
        "link": "entre em contato com o suporte"
      }
    }
  }
}
```

**Uso:**
```tsx
const t = useTranslations("errors.notFound");

<h1>{t("title")}</h1>
<p>{t("description")}</p>
<button>{t("actions.goHome")}</button>
<Link href="/support">{t("supportText.link")}</Link>
```

#### `errors.serverError` (500)

```json
{
  "errors": {
    "serverError": {
      "title": "Algo deu errado",
      "description": "Desculpe, ocorreu um erro inesperado.",
      "devMode": {
        "label": "Erro (modo desenvolvimento):"
      },
      "actions": {
        "tryAgain": "Tentar novamente",
        "goHome": "Voltar para Home"
      },
      "supportText": {
        "prefix": "Se o problema persistir,",
        "link": "entre em contato com o suporte"
      }
    }
  }
}
```

**Uso:**
```tsx
const t = useTranslations("errors.serverError");

<h1>{t("title")}</h1>
<p>{t("description")}</p>
<button onClick={reset}>{t("actions.tryAgain")}</button>
```

### Health Check (health.*)

```json
{
  "health": {
    "status": {
      "ok": "OK",
      "error": "Erro"
    },
    "fields": {
      "status": "Status",
      "version": "Versão",
      "environment": "Ambiente",
      "timestamp": "Data/Hora"
    },
    "environments": {
      "development": "Desenvolvimento",
      "production": "Produção",
      "preview": "Preview",
      "unknown": "Desconhecido"
    }
  }
}
```

---

## ✅ Checklist para Adicionar Novas Traduções

Ao criar qualquer componente ou página que exibe texto ao usuário:

- [ ] Identificar todos os textos visíveis
- [ ] Criar estrutura hierárquica no JSON
- [ ] Adicionar chaves em **pt-BR.json**
- [ ] Adicionar traduções em **en.json**
- [ ] Importar `useTranslations` no componente
- [ ] Substituir textos hardcoded por `t("key")`
- [ ] Testar em ambos os idiomas

---

## 🎯 Boas Práticas

### ✅ DO (Faça)

```tsx
// ✅ Use traduções para todos os textos visíveis
const t = useTranslations("accounts");
<button>{t("actions.create")}</button>

// ✅ Organize por domínio/módulo
"accounts.form.labels.name"
"accounts.messages.success.created"

// ✅ Use interpolação para dados dinâmicos
t("balance", { amount: formatCurrency(value) })

// ✅ Mantenha estrutura consistente
{
  "module": {
    "labels": {},
    "actions": {},
    "messages": {}
  }
}
```

### ❌ DON'T (Não faça)

```tsx
// ❌ Não use textos hardcoded
<button>Salvar</button>

// ❌ Não misture idiomas no código
const title = locale === "pt-BR" ? "Título" : "Title";

// ❌ Não crie chaves genéricas demais
t("text1"), t("text2"), t("button1")

// ❌ Não esqueça de adicionar em todos os idiomas
// pt-BR.json tem a chave, mas en.json não
```

---

## 🔄 Atualizar Traduções Existentes

### Arquivos Atualizados

1. **src/messages/pt-BR.json** - Adicione as novas chaves de `errors.*` e `health.*`
2. **src/messages/en.json** - Adicione as mesmas chaves traduzidas

### Estrutura Completa Atualizada

```json
{
  "localeSwitcher": { ... },
  "common": { ... },
  "dashboard": { ... },
  "errors": {
    "notFound": { ... },
    "serverError": { ... }
  },
  "health": { ... }
}
```

---

## 🧪 Testando i18n

### 1. Trocar Idioma

```tsx
import LocaleSwitcherSelect from "@/components/base/LocaleSwitcherSelect";

// Componente já existente no projeto
<LocaleSwitcherSelect items={...} />
```

### 2. Verificar Traduções

```bash
# Acesse a aplicação
http://localhost:3000

# Troque o idioma usando o seletor
# Navegue para /rota-inexistente (404)
# Simule um erro (500)
# Acesse /health

# Verifique se os textos mudam corretamente
```

### 3. Verificar Chaves Faltantes

Se uma chave não existir, next-intl mostrará um warning no console:

```
Missing translation: errors.notFound.title
```

---

## 📚 Exemplos Práticos

### Exemplo 1: Formulário de Conta

**JSON (pt-BR):**
```json
{
  "accounts": {
    "form": {
      "title": "Nova Conta",
      "labels": {
        "name": "Nome da Conta",
        "type": "Tipo",
        "balance": "Saldo Inicial"
      },
      "placeholders": {
        "name": "Ex: Conta Corrente",
        "balance": "0,00"
      },
      "actions": {
        "submit": "Criar Conta",
        "cancel": "Cancelar"
      }
    },
    "messages": {
      "success": {
        "created": "Conta criada com sucesso!"
      },
      "error": {
        "failed": "Erro ao criar conta"
      }
    }
  }
}
```

**Componente:**
```tsx
const t = useTranslations("accounts.form");

<form>
  <h2>{t("title")}</h2>
  
  <label>{t("labels.name")}</label>
  <input placeholder={t("placeholders.name")} />
  
  <label>{t("labels.balance")}</label>
  <input placeholder={t("placeholders.balance")} />
  
  <button type="submit">{t("actions.submit")}</button>
  <button type="button">{t("actions.cancel")}</button>
</form>
```

### Exemplo 2: Mensagens de Validação

**JSON:**
```json
{
  "validation": {
    "required": "Este campo é obrigatório",
    "email": "Email inválido",
    "minLength": "Mínimo de {min} caracteres",
    "maxLength": "Máximo de {max} caracteres",
    "positive": "O valor deve ser positivo"
  }
}
```

**Componente:**
```tsx
const t = useTranslations("validation");

const schema = z.object({
  email: z.string().email(t("email")),
  name: z.string().min(3, t("minLength", { min: 3 })),
  amount: z.number().positive(t("positive"))
});
```

---

## 🚀 Próximos Passos

1. ✅ Copiar `messages/pt-BR.json` para `src/messages/pt-BR.json`
2. ✅ Copiar `messages/en.json` para `src/messages/en.json`
3. ✅ Atualizar `app/not-found.tsx` com versão i18n
4. ✅ Atualizar `app/error.tsx` com versão i18n
5. ⏭️ Aplicar i18n em todos os novos componentes/páginas

---

## 📖 Referências

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
- [next-intl Examples](https://github.com/amannn/next-intl/tree/main/examples)

---

**Lembre-se: Sempre use i18n para QUALQUER texto visível ao usuário!** 🌍