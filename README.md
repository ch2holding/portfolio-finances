# 💰 Finance AI – Controle Financeiro Inteligente com IA

O **Finance AI** é uma plataforma completa de controle financeiro pessoal com suporte a:
✅ Múltiplas carteiras (crédito, débito, conta bancária, carteira física)  
✅ Compras parceladas com geração automática de parcelas  
✅ Faturas de cartão com fechamento e vencimento configuráveis  
✅ Importação de extratos bancários (CSV)  
✅ IA para classificação automática de gastos e insights financeiros  
✅ Dashboard com análise de despesas e orçamento mensal  
✅ Módulo de investimentos (renda fixa/variável)  
✅ Programas de pontos (Livelo, Esfera, Átomos, etc.)  
✅ Chat financeiro com LLM (ChatGPT-like)  
✅ Segurança com Firestore Rules + autenticação com NextAuth  

> ✅ Este projeto faz parte de um **portfólio profissional** demonstrando habilidades avançadas de engenharia frontend, backend, arquitetura de software e IA aplicada.

---

## 🚀 Stack Tecnológica

| Camada | Tecnologia | Motivo da escolha |
|--------|------------|-------------------|
| Frontend | Next.js 15 (App Router) | Performance + SSR/SSG + edge-ready |
| Linguagem | TypeScript | Tipagem forte e segurança |
| UI/Design | Tailwind CSS + Shadcn/UI | Componentes limpos e flexíveis |
| Autenticação | NextAuth.js | Auth seguro com JWT + Firebase |
| Banco de Dados | Firebase Firestore | Escalável, rápido e simples |
| Storage | Firestore + local | Dados estruturados e coleções |
| Validação | Zod | Segurança de dados |
| Gerenciamento de formulários | React Hook Form | Performance e DX |
| IA | LLM Provider Agnostic (OpenAI/local) | Extensível |
| Gráficos | Recharts | Versátil e simples |
| Testes | Vitest + Playwright | Unit + E2E |
| Qualidade | ESLint + Prettier + Husky | Padrão de código |
| Deploy | Vercel ou VPS (Docker) | Performático e simples |

---

## 📦 Estrutura (parcial)

/app # Rotas Next.js
/components # UI e componentes funcionais
/config # Config/env
/dto # DTOs de entrada/saída
/lib # Utils e helpers
/services # Domínio (accounts, transactions, ai etc)
/types # Tipagem global
/docs # Notas técnicas e ADRs


---

## Referencias

📚 Documentação de Arquitetura → ver [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## 🔧 Funcionalidades confirmadas (MVP+)

✅ Controle financeiro completo  
✅ Parcelamento com engine de parcelas  
✅ Dashboard com KPIs e gráficos  
✅ Orçamento por categoria  
✅ Importador CSV inteligente  
✅ Chat com IA para consultas financeiras  
✅ Classificação automática de gastos  
✅ Investimentos e posições  
✅ Programa de pontos e fidelidade  
✅ Histórico e auditoria leve  
✅ Segurança aprimorada com rules  

---

## 🔐 Segurança

- Firestore Rules com acesso isolado por usuário
- Dados privados nunca saem do backend
- Logs seguros e auditáveis
- Proteção contra Prompt Injection (IA)

---

## ✅ Status do Projeto

| Fase | Status |
|------|--------|
| Planejamento | ✅ Concluído |
| Roadmap técnico | ✅ Concluído |
| Sprint 1 – Setup/Arquitetura | ⏳ Em desenvolvimento |
| Backend + Frontend | 🔜 Próximo |
| IA | 🔜 Próximo |
| Deploy final | 🔜 Próximo |

---

## 🛠️ Scripts (pnpm)

| Script | Função |
|--------|--------|
| `pnpm dev` | Rodar em modo desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` | Lint do código |
| `pnpm typecheck` | Checar tipagem TS |
| `pnpm format` | Formatador Prettier |

---

## ✅ Requisitos

- Node.js 18+
- pnpm 9+
- Conta Firebase configurada
- Chave de API de IA (opcional no início)

---

### 🌎 Licença
Este projeto é **open source** sob licença MIT – uso livre e educativo.

---

### ✨ Autor
Desenvolvido por **Nelson Christovam Neto**
Portfólio profissional com foco em **arquitetura, escalabilidade e IA aplicada**.  
