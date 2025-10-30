# 📊 Bundle Analysis - Finance AI

## 🎯 Objetivo

Analisar o tamanho dos bundles JavaScript para identificar oportunidades de otimização e garantir performance ideal.

---

## 🚀 Como Usar

### Análise Completa (Client + Server)

```bash
pnpm analyze
```

Isso irá:
1. Fazer build de produção com análise habilitada
2. Gerar relatórios visuais em HTML
3. Abrir automaticamente no navegador

### Análise Específica

```bash
# Apenas client bundle
pnpm analyze:client

# Apenas server bundle
pnpm analyze:server

# Ambos explicitamente
pnpm analyze:both
```

---

## 📈 Interpretando os Resultados

### O que o Bundle Analyzer mostra:

- **📦 Tamanho de cada pacote** (parsed, gzipped, stat)
- **🎨 Visualização em treemap** - blocos maiores = pacotes maiores
- **📊 Comparação entre dependências**
- **🔍 Drill-down** - clique em blocos para ver detalhes

### Métricas Importantes:

| Métrica | Descrição | Meta |
|---------|-----------|------|
| **Stat Size** | Tamanho original do arquivo | Referência |
| **Parsed Size** | Tamanho após build (sem compressão) | < 200KB por chunk |
| **Gzipped Size** | Tamanho enviado pela rede | < 70KB por chunk |

---

## 🎯 Targets de Performance

### Initial Load (First Contentful Paint)

- **Client Bundle Total**: < 200KB (gzipped)
- **Main Chunk**: < 100KB (gzipped)
- **Vendor Chunk**: < 150KB (gzipped)

### Code Splitting

- **Chunk médio**: 20-50KB (gzipped)
- **Chunks de rotas**: < 30KB cada (gzipped)

---

## ⚠️ Sinais de Alerta

### 🔴 Problemas Críticos

- ❌ Pacote principal > 200KB (gzipped)
- ❌ Vendor chunk > 300KB (gzipped)
- ❌ Duplicação de código entre chunks
- ❌ Lodash completo importado (use lodash-es)

### 🟡 Atenção Necessária

- ⚠️ Pacote principal > 150KB (gzipped)
- ⚠️ Muitas dependências pesadas
- ⚠️ Chunks muito grandes (> 100KB)
- ⚠️ Imports desnecessários

---

## 🔧 Estratégias de Otimização

### 1. Tree Shaking Efetivo

**❌ Errado:**
```typescript
import _ from 'lodash';
import { Button } from 'ui-library';
```

**✅ Correto:**
```typescript
import debounce from 'lodash-es/debounce';
import { Button } from 'ui-library/Button';
```

### 2. Dynamic Imports

**Para componentes pesados:**
```typescript
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Carregando...</p>,
  ssr: false, // Se não precisa de SSR
});
```

**Para bibliotecas grandes:**
```typescript
// Carregar apenas quando necessário
const loadPdfLib = async () => {
  const pdfLib = await import('pdf-lib');
  return pdfLib;
};
```

### 3. Code Splitting por Rota

Next.js já faz automaticamente, mas você pode otimizar:

```typescript
// app/heavy-feature/page.tsx
import dynamic from 'next/dynamic';

// Componentes pesados carregados apenas nesta rota
const ComplexDashboard = dynamic(() => import('./ComplexDashboard'));
```

### 4. Remover Dependências Desnecessárias

```bash
# Analisar dependências não usadas
pnpm dlx depcheck

# Analisar duplicatas
pnpm dedupe
```

### 5. Otimizar Imports de UI Libraries

**Para shadcn/ui e Radix:**
```typescript
// ✅ Import específico
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';

// ❌ Evite barrel imports grandes
import { Button, Dialog, Popover, ... } from 'ui-library';
```

---

## 📦 Bibliotecas Comuns e Alternativas

### Date Manipulation

| Biblioteca | Tamanho (min+gzip) | Alternativa |
|------------|-------------------|-------------|
| moment.js | 71KB | ❌ Evitar |
| date-fns | 78KB (completo) | ✅ Importar funções individuais |
| dayjs | 7KB | ✅ Recomendado |
| Intl API | 0KB (nativo) | ✅ Melhor opção |

### Icons

| Biblioteca | Tamanho | Estratégia |
|------------|---------|-----------|
| react-icons | Variável | Tree-shake: `react-icons/fa` |
| lucide-react | ~1KB/ícone | ✅ Otimizado |
| heroicons | ~0.5KB/ícone | ✅ SVG inline |

### State Management

| Biblioteca | Tamanho (min+gzip) |
|------------|-------------------|
| redux + toolkit | ~20KB |
| zustand | ~3KB |
| jotai | ~3KB |
| Context API | 0KB (nativo) |

---

## 🎨 Análise Visual

### Como Ler o Treemap

```
┌──────────────────────────────────────┐
│                                      │
│  ┌─────────────┐  ┌──────┐          │
│  │   react     │  │ next │          │  ← Grandes blocos = atenção
│  │   (80KB)    │  │(50KB)│          │
│  └─────────────┘  └──────┘          │
│                                      │
│  ┌──────┐ ┌───┐ ┌───┐               │
│  │lodash│ │d3 │ │...│               │  ← Vários pequenos = OK
│  │(30KB)│ │15K│ │   │               │
│  └──────┘ └───┘ └───┘               │
└──────────────────────────────────────┘
```

**Cores:**
- 🟢 Verde: Tamanho aceitável
- 🟡 Amarelo: Atenção necessária
- 🔴 Vermelho: Muito grande

---

## ✅ Checklist de Otimização

Após rodar o analyzer, verifique:

- [ ] Nenhum chunk > 200KB (gzipped)
- [ ] Sem duplicação de código entre chunks
- [ ] Tree-shaking funcionando (sem código morto)
- [ ] Dynamic imports em componentes pesados
- [ ] Imports específicos (não barrel imports)
- [ ] Sem bibliotecas desnecessárias
- [ ] Imagens otimizadas (webp/avif)
- [ ] Fonts inline ou preload
- [ ] CSS crítico inline

---

## 🔍 Ferramentas Complementares

### 1. Lighthouse CI

```bash
pnpm dlx @lhci/cli@latest autorun
```

### 2. Bundle Phobia

Antes de instalar uma lib, verifique:
https://bundlephobia.com

### 3. Import Cost (VSCode Extension)

Mostra tamanho dos imports em tempo real

### 4. Webpack Bundle Analyzer (alternativa)

```bash
pnpm add -D webpack-bundle-analyzer
```

---

## 📚 Referências

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Web.dev - Performance](https://web.dev/performance/)
- [Next.js Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Bundle Phobia](https://bundlephobia.com)

---

## 🎯 Metas do Finance AI

### Current State (Baseline)
- TBD após primeira análise

### Target State (Q1 2025)
- Client bundle: < 180KB (gzipped)
- Initial load: < 2s (3G)
- Time to Interactive: < 3.5s

### Stretch Goal (Q2 2025)
- Client bundle: < 150KB (gzipped)
- Initial load: < 1.5s (3G)
- Perfect Lighthouse score (100)