Run:

1. npm install
2. npm run dev
3. Open link

Code formatting:

- Prettier: "npx prettier --write ."
- ESLint: "npm run lint"

Extensions:

- Prettifier - Code formatter
- Prisma
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

ShadCN

- For React components
- https://ui.shadcn.com/

Prisma and PostgreSQL

- For the database
- npx prisma db push (required after any prisma.schema changes)
- npx prisma studio (database viewer)
- npx prisma generate --no-engine
- https://console.prisma.io/cmdb46yeo003wxj0vbwmvqo2p/overview
- https://www.prisma.io/
- https://www.prisma.io/docs/getting-started/prisma-postgres/from-the-cli

Google Cloud

- For Google sign in support
- https://console.cloud.google.com

Google AI Studio

- For AI question generation
- https://aistudio.google.com/

Lucide

- For icons
- https://lucide.dev/

Insomnia

- For request testing
- https://insomnia.rest/
- Ex: POST - localhost:3000/api/questions
- Body - {"amount": 3, "topic": "theories of evolution", "type": "mcq"}

PowerShell Permissions Error:

1. Run PowerShell as administrator
2. Set-ExecutionPolicy RemoteSigned
