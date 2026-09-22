# Portfolio

Site pessoal com painel administrativo para gerenciamento de projetos, tecnologias e dados do usuário.

## Funcionalidades

- **Site público** — apresentação, sobre mim, projetos em destaque e contatos
- **Painel administrativo** (`/manager`) protegido por autenticação:
  - CRUD completo de projetos
  - CRUD completo de tecnologias
  - Gerenciamento dos dados do usuário admin (limitado a 1 por sistema)
  - Upload de imagens
  - Listagem paginada com busca
- **Autenticação** via JWT assinado (`jose`), armazenado em cookie `httpOnly`

## Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) v7
- [Neon](https://neon.tech/) (PostgreSQL serverless)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (animações)
- [Cloudflare R2](https://developers.cloudflare.com/r2/) (armazenamento de arquivos)
- [jose](https://github.com/panva/jose) (JWT)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (hash de senhas)

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- Conta na [Neon](https://neon.tech/) (banco PostgreSQL gratuito)
- Conta na Cloudflare com bucket R2 configurado

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```dotenv
# Neon — pooled (usada pela aplicação em runtime)
DATABASE_URL="postgresql://usuario:senha@ep-xxxxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Neon — direta (usada só pelo Prisma CLI para migrations)
DIRECT_URL="postgresql://usuario:senha@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

JWT_SECRET="sua_string_secreta_aqui"

R2_ACCOUNT_ID="seu_account_id"
R2_ACCESS_KEY_ID="sua_access_key"
R2_SECRET_ACCESS_KEY="sua_secret_key"
R2_BUCKET_NAME="nome_do_bucket"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"
```

#### Alternativa: rodando com PostgreSQL local

Se preferir não depender da Neon durante o desenvolvimento, é possível apontar para um PostgreSQL rodando localmente. Como o `prisma.config.ts` sempre lê `DIRECT_URL` para os comandos do Prisma CLI, defina as duas variáveis apontando para o mesmo banco local (não existe distinção entre conexão pooled/direta fora da Neon):

```dotenv
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/portfolio?schema=public"
DIRECT_URL="postgresql://postgres:sua_senha@localhost:5432/portfolio?schema=public"
```

> Lembre-se de ter um banco `portfolio` criado localmente antes de rodar as migrations, e de trocar de volta para as connection strings da Neon antes de fazer deploy (a Vercel não tem acesso a `localhost`).

### 4. Rode as migrations e gere o Prisma Client

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Crie o usuário administrador

```bash
npx prisma db seed
```

> Isso cria o único usuário admin do sistema. Troque a senha padrão definida em `prisma/seed.ts` antes do primeiro login.

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). O painel administrativo fica em `/manager` (login em `/login`).

## Estrutura do projeto

```
app/
├── (site)/           # Páginas públicas do portfolio
├── api/               # Route Handlers (API REST)
├── login/             # Tela de login
└── manager/           # Painel administrativo (protegido)
controllers/           # Lógica de negócio das rotas de API
lib/                    # Clientes/helpers (Prisma, R2, JWT, requireAuth)
prisma/                 # Schema, migrations e seed
middleware.ts           # Protege as páginas de /manager
```

## Autenticação

O painel administrativo é acessível apenas para o usuário admin (limitado a 1 por sistema). O login gera um JWT assinado, armazenado em cookie `httpOnly`. As páginas de `/manager` são protegidas pelo `middleware.ts`; as rotas de API que exigem autenticação usam o helper `requireAuth()`.

## Sobre o banco (Neon)

O projeto usa duas connection strings: uma **pooled** (`DATABASE_URL`, via PgBouncer) usada pela aplicação em runtime, e uma **direta** (`DIRECT_URL`) usada apenas pelo Prisma CLI para rodar migrations. Essa separação evita esgotar o limite de conexões em ambiente serverless.

## Deploy

Projeto configurado para deploy na [Vercel](https://vercel.com/). Lembre-se de adicionar todas as variáveis de ambiente (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, variáveis do R2) no painel do projeto antes do deploy.

## Licença

Este projeto é de uso pessoal.