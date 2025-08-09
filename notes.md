## 🛠️ Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/BraedonHaensel/triv-ai.git
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

3. Create the `.env` file from the template

   ```bash
   cp .env.example .env
   ```

4. Populate the `.env` file with the [environment variable values](https://app.netlify.com/projects/trivai/configuration/env#content)
   - 💡For information about each variable, see [Environment Variables](#-environment-variables)

5. Run the development server

   ```bash
   npm run dev
   ```

## 🚀 Deployment

Deployed to Netlify via [continuous deployment](https://app.netlify.com/projects/trivai/configuration/deploys#branches-and-deploy-contexts).

- Ensure the [environment variables](https://app.netlify.com/projects/trivai/configuration/env#content)
  and [production branch](https://app.netlify.com/projects/trivai/configuration/deploys#branches-and-deploy-contexts)
  are configured correctly.

## 🧩 Recommended Extensions

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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

Sonner

- For notifications
- https://sonner.emilkowal.ski/

Storyset

- For GIFs
- https://storyset.com/
- Edit with https://ezgif.com/
- Remove background with https://www.unscreen.com/upload

PowerShell Permissions Issues:

1. Run PowerShell as administrator
2. Set-ExecutionPolicy RemoteSigned
3. Right click VS Code shortcut > Properties > Compatibility
4. Check "Run this program as an administrator"
5. Relaunch VS Code

Emojis:

- https://gist.github.com/roachhd/1f029bd4b50b8a524f3c

## 🌱 Environment Variables

| Variable             | Description                               | Origin                                                                 |
| -------------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| API_URL              | Base URL for API requests                 | Dev: `http://localhost:3000/` <br> Prod: `https://trivai.netlify.app/` |
| DATABASE_URL         | Prisma PostgreSQL database connection URL | [Prisma Console](https://console.prisma.io/)                           |
| GOOGLE_CLIENT_ID     | Google OAuth 2.0 Client ID                | [Google Cloud Console](https://console.cloud.google.com/)              |
| GOOGLE_CLIENT_SECRET | Google OAuth 2.0 Client Secret            | [Google Cloud Console](https://console.cloud.google.com/)              |
| GEMINI_API_KEY       | API key for Google Gemini AI              | [Google AI Studio](https://aistudio.google.com/)                       |
| NEXTAUTH_SECRET      | Secret used by NextAuth.js for encryption | Generate via: `npx auth secret`                                        |
| NEXTAUTH_URL         | Base URL for NextAuth.js                  | Dev: `http://localhost:3000/` <br> Prod: `https://trivai.netlify.app/` |
