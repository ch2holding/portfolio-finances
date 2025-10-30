# 🚀 Configuração de Ambiente - Finance AI

## 📋 Pré-requisitos

- Node.js 18+ (recomendado: 20.x)
- pnpm 8+ (ou npm/yarn)
- Conta Firebase
- Conta Google Cloud (para OAuth)
- Conta OpenAI (opcional, para features de IA)

---

## ⚙️ Setup Inicial

### 1️⃣ Clonar e Instalar Dependências

```bash
git clone <repository-url>
cd finance-ai
pnpm install
```

### 2️⃣ Configurar Variáveis de Ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env.local

# Editar com suas credenciais
# Use seu editor favorito (vim, nano, vscode, etc.)
nano .env.local
```

---

## 🔥 Firebase Setup

### Client Config (Públicas)

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá em **Project Settings** > **General**
4. Na seção **Your apps**, copie as configurações do Web App:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

### Admin Config (Privadas)

1. No Firebase Console, vá em **Project Settings** > **Service Accounts**
2. Clique em **Generate new private key**
3. Salve o arquivo JSON baixado em local seguro
4. Copie os valores para o `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

⚠️ **IMPORTANTE:** O `FIREBASE_PRIVATE_KEY` deve manter as quebras de linha (`\n`)

---

## 🔐 NextAuth Setup

### Gerar Secret

```bash
# Gerar um secret seguro
openssl rand -base64 32
```

Copie o resultado para:

```env
NEXTAUTH_SECRET=<resultado_do_comando_acima>
NEXTAUTH_URL=http://localhost:3000
```

### Configurar Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com)
2. Vá em **APIs & Services** > **Credentials**
3. Clique em **Create Credentials** > **OAuth client ID**
4. Configure:
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copie as credenciais:

```env
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_secret_here
```

---

## 🤖 OpenAI Setup (Opcional)

Para habilitar features de IA:

1. Acesse [OpenAI Platform](https://platform.openai.com/api-keys)
2. Crie uma nova API Key
3. Configure no `.env.local`:

```env
OPENAI_API_KEY=sk-proj-...
AI_MODEL=gpt-4o-mini
NEXT_PUBLIC_ENABLE_AI_FEATURES=true
```

---

## ✅ Validação da Configuração

Ao rodar o projeto, o sistema valida automaticamente todas as variáveis de ambiente usando Zod.

```bash
pnpm dev
```

Se algo estiver faltando, você verá um erro detalhado indicando qual variável está incorreta:

```
❌ Erro na validação de variáveis de ambiente (SERVER):
{
  NEXTAUTH_SECRET: [ 'NextAuth Secret deve ter pelo menos 32 caracteres' ]
}
```

---

## 🌍 Ambientes

### Development

```env
NEXT_PUBLIC_APP_ENV=development
NODE_ENV=development
NEXTAUTH_DEBUG=true
```

### Preview (Staging)

```env
NEXT_PUBLIC_APP_ENV=preview
NODE_ENV=production
NEXTAUTH_DEBUG=false
```

### Production

```env
NEXT_PUBLIC_APP_ENV=production
NODE_ENV=production
NEXTAUTH_DEBUG=false
```

---

## 🔧 Troubleshooting

### Erro: "Missing required environment variable"

✅ Verifique se copiou o `.env.example` para `.env.local`  
✅ Confirme que todas as variáveis obrigatórias estão preenchidas  
✅ Reinicie o servidor de desenvolvimento (`pnpm dev`)

### Erro: "Firebase Private Key inválida"

✅ Certifique-se de manter as quebras de linha (`\n`)  
✅ Coloque a chave entre aspas duplas  
✅ Não remova os marcadores `BEGIN/END PRIVATE KEY`

### Erro: "NextAuth Secret deve ter pelo menos 32 caracteres"

✅ Gere um novo secret com: `openssl rand -base64 32`  
✅ Use o resultado completo sem modificações

---

## 📚 Referências

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup)
- [NextAuth Configuration](https://next-auth.js.org/configuration/options)
- [Zod Documentation](https://zod.dev)

---

## 🔒 Segurança

⚠️ **NUNCA commite arquivos `.env*` (exceto `.env.example`)**  
⚠️ **NUNCA compartilhe suas credenciais**  
⚠️ **Use secrets diferentes para cada ambiente**  
⚠️ **Rotacione suas chaves periodicamente**

✅ Arquivos `.env*` estão protegidos pelo `.gitignore`  
✅ Use variáveis `NEXT_PUBLIC_*` apenas para dados não-sensíveis  
✅ Mantenha credenciais privadas apenas no servidor