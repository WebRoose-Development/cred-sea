
## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm install
```
## start the postgres localhost server
get the postgres localhost port and username and password


## add a .env file
create a .env file

add your database url in place of postgresql://postgres:hello@localhost:5433/credsea

DATABASE_URL="postgresql://postgres:hello@localhost:5433/credsea"

## prisma config
```bash
npx prisma migrate dev --name migration1  
npx prisma generate
```

## starting the sveltekit server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
