# Roadmap – Finance AI Platform (Next.js + Firestore + IA)

## ✅ Fase 1 — Fundamentos do Projeto (Arquitetura e Setup)
- ✅ Criar projeto Next.js 15 + Typescript + App Router
- ✅ Configurar Tailwind + Shadcn/UI
- ✅ Configurar biome
- ✅ Layout base + temas dark/light
- ✅ NextAuth (Google + Email/Password com Credential + JWT)
- [ ] Firebase Admin + Firestore + Regras de Segurança
- [ ] Variáveis de ambiente + configuração inicial de deploy (VPS)

---

## ✅ Fase 2 — Domínio Financeiro (Core do App)
### Contas / Carteiras
- [ ] CRUD de contas (wallet, cartão crédito, cartão débito, bancos)
- [ ] Seleção de bandeira (Visa, Master, Amex, Elo, etc.)
- [ ] Limites e regras de fatura para cartão de crédito
- [ ] Controle multi-moeda (base BRL inicialmente)
- [ ] UI com ícones e tipos de carteira

### Transações
- [ ] CRUD de transações
- [ ] Filtros: data, categoria, bandeira, conta, tags
- [ ] Parser CSV (Nubank, Inter, Santander, Itaú, Caixa, Bradesco + Genérico)
- [ ] Duplicidade inteligente na importação
- [ ] Parcelamento (grupos de parcelas) + faturas mensais
- [ ] Transferências entre contas

---

## ✅ Fase 3 — Inteligência Financeira com IA (LLM)
- [ ] Classificação automática de transações
- [ ] Chat financeiro com consulta por linguagem natural
- [ ] Insights mensais personalizados (LLM + regras)
- [ ] Revisão automática de categorias com IA
- [ ] Controle de custo de tokens + quotas
- [ ] Privacidade: mascaramento de dados antes do envio ao LLM

---

## ✅ Fase 4 — Orçamento, Metas e Indicadores
- [ ] Orçamento mensal por categoria
- [ ] Alertas de estouro de orçamento
- [ ] Tendências (últimos 3 meses)
- [ ] Metas financeiras
- [ ] Previsões baseadas no histórico

---

## ✅ Fase 5 — Módulo de Investimentos
- [ ] Contas de investimento (corretoras, poupança, cripto)
- [ ] Movimentações (buy/sell/apply)
- [ ] Proventos (dividendos/JCP/juros)
- [ ] Snapshot de posição
- [ ] Relatório de alocação
- [ ] Comparação com perfil de risco + rebalanceamento
- [ ] IA: análise de portfólio

---

## ✅ Fase 6 — Pontos e Programas de Fidelidade
- [ ] Programas: Livelo, Esfera, Iupp, LATAM Pass, Smiles, etc.
- [ ] Saldo por programa
- [ ] Expiração automática
- [ ] Histórico de ganhos/perdas
- [ ] Integração com contas/cartões
- [ ] IA: recomendação de transferência e otimização de pontos

---

## ✅ Fase 7 — Polimento e Lançamento
- [ ] Dashboard final com visão unificada
- [ ] Exportação PDF e CSV
- [ ] Email financeiro semanal
- [ ] SEO + Lighthouse 90+
- [ ] Tests (unit + e2e)
- [ ] Deploy final + documentação
