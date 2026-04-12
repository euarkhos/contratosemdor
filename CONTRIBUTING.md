# Contribuir — estrutura do repositório

Este documento fixa **pastas e limites** para o MVP (Next.js + Neon + Prisma), alinhado ao [roadmap técnico](docs/ROADMAP-TECH.md) e aos [padrões de dados](docs/data-patterns.md).

## Árvore alvo (resumo)

```
app/                    # App Router: rotas, layouts, loading/error por segmento
  api/                  # Route Handlers (REST, webhooks)
  (rotas futuras)/      # Grupos de rotas ou rotas nomeadas
lib/
  db.ts                 # Cliente Prisma singleton (não duplicar em cada ficheiro)
  domain/               # Regras de negócio puras (sem Prisma, sem fetch)
  …                     # Helpers, validação (ex.: Zod), clientes HTTP a serviços externos
server/
  services/             # Casos de uso: orquestram domínio + adaptadores (BD, fila, storage)
prisma/
  schema.prisma
  migrations/
```

- **`app/`** — UI e entrada HTTP. Server Components e Server Actions por defeito; `"use client"` só onde for necessário.
- **`lib/domain/`** — funções testáveis sem efeitos laterais (cálculos, validações de regras já descritas em `docs/business-rules.md`).
- **`server/services/`** — um ficheiro (ou pasta) por caso de uso vertical (ex.: “criar pré-análise”, “registar pagamento”), chamando `lib/db` ou outros adaptadores.
- **Adaptadores** (ORM, storage S3, fila, PSP) ficam atrás de interfaces quando a complexidade justificar; no MVP pode chamar-se Prisma directamente a partir de `server/services/` com critério.

## Convenções de naming

- Ficheiros TypeScript: **`kebab-case.ts`** ou **`PascalCase.tsx`** para componentes React (consistente dentro de `app/`).
- Imports com alias **`@/`** (ex.: `import { prisma } from "@/lib/db"`).
- IDs em API e JSON: **UUID em string**, datas em **ISO 8601**, conforme [data-patterns.md](docs/data-patterns.md).

## Base de dados

- Schema e migrações: ver [orm-and-database.md](docs/architecture/orm-and-database.md).
- Scripts: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:deploy` (ou `npm run` equivalente).

## Commits e PRs

- Mensagens claras; PRs pequenos e focados num caso de uso ou correção.
