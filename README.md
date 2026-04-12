# Contrato Sem Dor

**Análise de contratos inteligentes** — liga o teu contrato a estudantes de direito num fluxo guiado: **pré-análise por IA**, **pagamento transparente** e **revisão humana** com filas por nível e regras de elegibilidade, do envio à entrega.

A plataforma junta clientes e estudantes num só sítio: menos atrito entre ferramentas, mais **rasto do pedido ao pagamento** e repositório preparado para relatórios e auditoria.

## O que a landing destaca

- **Produto** — Hub de análises contratuais: pré-análise, pagamento e revisão humana num fluxo único.
- **Três pilares** — Pré-análise com IA (complexidade e orçamento antes de pagar); revisão por estudantes com filas e níveis por semestre; repositório inteligente para contratos e obrigações.
- **Diferenciação** — IA ao longo do ciclo; integração com o ecossistema da equipa; onboarding e suporte orientados à operação jurídica e de negócio.
- **Contas** — Registo e entrada para perfis de **cliente** ou **estudante** (`/registo`, `/entrar`).

## Stack

- **Next.js** (App Router), **React**, **TypeScript**
- **PostgreSQL** na **Neon**, via **Prisma**
- Deploy previsto: **Netlify** · código em **GitHub**

## Desenvolvimento

```bash
npm install
```

Define `DATABASE_URL` (e `DIRECT_URL` se usares `directUrl` no Prisma) em `.env.local`. O Next.js carrega este ficheiro automaticamente; os scripts `db:*` usam `node --env-file=.env.local` para o CLI do Prisma alinhar com o mesmo ficheiro.

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção (inclui prisma generate)
npm run db:status    # estado das migrações
npm run db:migrate   # criar/aplicar migrações em dev
npm run db:studio    # Prisma Studio
```

Documentação adicional: pasta `docs/`.
