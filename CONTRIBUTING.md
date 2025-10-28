## 🛠️ Ferramentas de Qualidade

### Biome

O Finance AI usa **Biome** para formatação e linting. Biome é:
- ⚡ **10x mais rápido** que ESLint + Prettier
- 🔧 **Configuração única** (sem conflitos entre ferramentas)
- 📦 **Zero dependências** extras

#### Comandos
```bash
# Verificar tudo (format + lint + organize imports)
npm run biome:check

# Aplicar correções automaticamente
npm run biome:check:write

# Apenas formatar
npm run biome:format

# Apenas lint
npm run biome:lint
```

### SSR Safety Check

O projeto tem uma validação customizada para garantir que código no `src/domain/` seja SSR Safe:
```bash
node scripts/check-ssr-safe.js
```

Isso bloqueia uso de:
- `window`
- `document`
- `localStorage`
- `sessionStorage`

**Por quê?** Domain Services precisam rodar no servidor (Next.js SSR).