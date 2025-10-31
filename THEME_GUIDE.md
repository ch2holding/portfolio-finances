# 🎨 Finance AI - Guia de Tema e Cores

## 📋 Visão Geral

O tema Finance AI foi projetado especificamente para aplicações financeiras, transmitindo **confiança**, **profissionalismo** e **modernidade**.

---

## 🎯 Paleta de Cores Principal

### Primary (Azul Profundo)
**Uso:** Botões principais, links, elementos de destaque
```css
--primary: hsl(217 91% 60%);        /* Light mode */
--primary: hsl(217 91% 65%);        /* Dark mode */
```
**Representa:** Confiança, estabilidade financeira, profissionalismo

### Success (Verde Financeiro)
**Uso:** Ganhos, crescimento positivo, confirmações
```css
--success: hsl(160 84% 39%);        /* Light mode */
--success: hsl(160 84% 45%);        /* Dark mode */
```
**Representa:** Lucro, crescimento, sucesso financeiro

### Warning (Amarelo/Laranja)
**Uso:** Alertas, atenção necessária, limites de orçamento
```css
--warning: hsl(38 92% 50%);         /* Light mode */
--warning: hsl(38 92% 58%);         /* Dark mode */
```
**Representa:** Cuidado, atenção, alertas importantes

### Destructive (Vermelho)
**Uso:** Erros, perdas, ações destrutivas
```css
--destructive: hsl(0 72% 51%);      /* Light mode */
--destructive: hsl(0 63% 48%);      /* Dark mode */
```
**Representa:** Prejuízo, erro, ações irreversíveis

---

## 📊 Cores para Gráficos Financeiros

O tema inclui uma paleta específica para visualização de dados:

```css
--chart-1: Azul    (Primary)     /* Receitas, Saldo Total */
--chart-2: Verde   (Success)     /* Investimentos, Ganhos */
--chart-3: Amarelo (Warning)     /* Despesas, Alertas */
--chart-4: Roxo                  /* Carteira, Diversificação */
--chart-5: Vermelho (Destructive) /* Dívidas, Perdas */
```

**Uso nos componentes:**
```tsx
import { BarChart, Bar } from "recharts";

<BarChart>
  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
  <Bar dataKey="gains" fill="hsl(var(--chart-2))" />
  <Bar dataKey="expenses" fill="hsl(var(--chart-3))" />
</BarChart>
```

---

## 💰 Cores Específicas Finance AI

### Categorias de Investimentos

```css
/* Variáveis customizadas */
--finance-stocks: Azul    /* Ações */
--finance-bonds: Verde    /* Renda Fixa */
--finance-crypto: Roxo    /* Criptomoedas */
--finance-reits: Amarelo  /* Fundos Imobiliários */
```

**Exemplo de uso:**
```tsx
<div className="bg-[hsl(var(--finance-stocks))]">
  Ações
</div>
```

### Indicadores Financeiros

```css
--finance-gain: Verde         /* Para valores positivos */
--finance-loss: Vermelho      /* Para valores negativos */
--finance-neutral: Cinza      /* Para valores neutros */
```

**Exemplo de uso:**
```tsx
const ValueDisplay = ({ value }) => {
  const color = value > 0 
    ? 'text-[hsl(var(--finance-gain))]' 
    : value < 0 
      ? 'text-[hsl(var(--finance-loss))]'
      : 'text-[hsl(var(--finance-neutral))]';
  
  return <span className={color}>R$ {value}</span>;
};
```

---

## 🌓 Light Mode vs Dark Mode

### Características Light Mode
- **Background:** Branco puro `hsl(0 0% 100%)`
- **Foreground:** Azul escuro `hsl(222 47% 11%)`
- **Cards:** Branco com bordas sutis
- **Ideal para:** Uso diurno, ambientes claros

### Características Dark Mode
- **Background:** Azul muito escuro `hsl(222 47% 11%)`
- **Foreground:** Branco quente `hsl(210 40% 98%)`
- **Cards:** Tons de azul escuro `hsl(222 47% 15%)`
- **Ideal para:** Uso noturno, redução de fadiga visual

**Mudança automática:**
```tsx
// O tema responde automaticamente à classe .dark
<html className="dark">
  {/* Todo o tema muda automaticamente */}
</html>
```

---

## 🎨 Como Usar as Cores

### 1. Via Tailwind (Preferido)

```tsx
// Background
<div className="bg-primary">Primary background</div>
<div className="bg-success">Success background</div>

// Text
<span className="text-primary">Primary text</span>
<span className="text-success">Success text</span>

// Border
<div className="border border-primary">Primary border</div>
```

### 2. Via CSS Variables

```tsx
// Inline style
<div style={{ backgroundColor: 'hsl(var(--primary))' }}>
  Custom color
</div>

// CSS Module
.myComponent {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### 3. Via Componentes shadcn/ui

```tsx
import { Button } from "@/components/ui/button";

// Automático: usa as cores do tema
<Button>Primary Button</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
```

---

## 📐 Radius (Arredondamento)

```css
--radius: 0.625rem; /* 10px */
```

**Variações:**
```css
--radius-sm: calc(var(--radius) - 4px)  /* 6px */
--radius-md: calc(var(--radius) - 2px)  /* 8px */
--radius-lg: var(--radius)              /* 10px */
--radius-xl: calc(var(--radius) + 4px)  /* 14px */
```

---

## 🎯 Boas Práticas

### ✅ DO

```tsx
// Use as variáveis do tema
<Button className="bg-primary text-primary-foreground">
  Confirmar
</Button>

// Use cores semânticas
{value > 0 && (
  <span className="text-success">+R$ {value}</span>
)}
```

### ❌ DON'T

```tsx
// Não use cores hardcoded
<Button className="bg-blue-500 text-white">
  Confirmar
</Button>

// Não ignore dark mode
<div style={{ color: '#000000' }}>
  Texto (não funciona em dark mode)
</div>
```

---

## 🔧 Customização

Para modificar o tema, edite `src/styles/default.css`:

```css
:root {
  /* Mudar cor primária */
  --primary: hsl(220 90% 55%); /* Novo azul */
  
  /* Adicionar nova cor customizada */
  --finance-premium: hsl(280 80% 60%); /* Roxo premium */
}
```

---

## 📊 Exemplos Práticos

### Card de Saldo

```tsx
<Card>
  <CardHeader>
    <CardTitle>Saldo Total</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-primary">
      R$ 15.420,00
    </div>
    <div className="text-sm text-success">
      +R$ 1.200,00 (8.4%)
    </div>
  </CardContent>
</Card>
```

### Botão de Ação Financeira

```tsx
<Button 
  variant="default" 
  className="bg-success hover:bg-success/90"
>
  Adicionar Receita
</Button>

<Button 
  variant="default" 
  className="bg-destructive hover:bg-destructive/90"
>
  Adicionar Despesa
</Button>
```

### Badge de Status

```tsx
<Badge className="bg-success text-success-foreground">
  Pago
</Badge>

<Badge className="bg-warning text-warning-foreground">
  Pendente
</Badge>

<Badge className="bg-destructive text-destructive-foreground">
  Atrasado
</Badge>
```

---

## 🌈 Paleta Completa

### Light Mode
| Cor | Hex Aproximado | HSL |
|-----|----------------|-----|
| Primary | #3B82F6 | hsl(217 91% 60%) |
| Success | #059669 | hsl(160 84% 39%) |
| Warning | #F59E0B | hsl(38 92% 50%) |
| Destructive | #DC2626 | hsl(0 72% 51%) |
| Background | #FFFFFF | hsl(0 0% 100%) |
| Foreground | #0F172A | hsl(222 47% 11%) |

### Dark Mode
| Cor | Hex Aproximado | HSL |
|-----|----------------|-----|
| Primary | #60A5FA | hsl(217 91% 65%) |
| Success | #10B981 | hsl(160 84% 45%) |
| Warning | #FBBF24 | hsl(38 92% 58%) |
| Destructive | #EF4444 | hsl(0 72% 55%) |
| Background | #0F172A | hsl(222 47% 11%) |
| Foreground | #F8FAFC | hsl(210 40% 98%) |

---

## 🎓 Recursos

- **Tailwind CSS:** https://tailwindcss.com/docs/customizing-colors
- **shadcn/ui:** https://ui.shadcn.com/docs/theming
- **HSL Colors:** https://www.w3schools.com/colors/colors_hsl.asp

---

**🎨 Tema profissional para aplicação financeira!**