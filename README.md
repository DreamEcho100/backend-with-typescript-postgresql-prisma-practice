# backend-with-typescript-postgresql-prisma-practice

- [(PART 1) Backend with TypeScript PostgreSQL & Prisma: Data Modeling & CRUD](https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-data-modeling-tsjs1ps7kip1)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)

```bash
  npx prisma migrate dev --preview-feature --skip-generate --name "init"
```

Run `prisma migrate dev` - Prisma Migrate detects that a migration has changed, and asks to reset the database.

```bash
  npx prisma migrate dev
```

Reset the development database
You can also reset the database yourself to undo manual changes or db push experiments by running:

```bash
  npx prisma migrate reset
```

Customizing migrations
Sometimes, you need to modify a migration before applying it. For example:

- You want to introduce a significant refactor, such as changing blog post tags from a String[] to a Tag[]
- You want to rename a field (by default, Prisma Migrate will drop the existing field)
- You want to change the direction of a 1-1 relationship
- You want to add features that cannot be represented in Prisma Schema Language - such as a partial index or a stored procedure.

The `--create-only` command allows you to create a migration without applying it:

```bash
  npx prisma migrate dev --create-only
```

Production and testing environments

In production and testing environments, use the migrate deploy command to apply migrations:

```bash
  npx prisma migrate deploy
```

Note: migrate deploy should generally be part of an automated CI/CD pipeline, and we do not recommend running this command locally to deploy changes to a production database.

## Generating Prisma Client, typically requires three steps

Add the following generator definition to your Prisma schema:

```prisma
 generator client {
   provider        = "prisma-client-js"
}
```

Install the @prisma/client npm package

```bash
npm install --save @prisma/client
```

Generate Prisma Client with the following command:

```bash
npx prisma generate
```

````bash
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (3.12.0 | library) to .\node_modules\@prisma\client in 188ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
\```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
\```
```
````

## To explore the data in the database, you can run Prisma Studio

Prisma Studio is a visual editor for your database. To run Prisma Studio, run the following command in your terminal:

```bash
  npx prisma studio
```

## touch npm package for windows

```bash
npm install touch-cli -g
```
