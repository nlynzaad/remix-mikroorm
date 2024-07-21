# Remixing Mikro-orm

This is a bare-bones test project to implement [mikro-orm](https://mikro-orm.io/) and [Remix (vite plugin)](https://remix.run/).

This generally just works the only real quirk is the requirement by the CLI to include the file extension which can be an annoyance with typescript. 
This can either be enabled globally in the tsconfig or disabled on a case by case basis using ts comments. In this project I've opted to disable on a case by case basis. 

## Getting started

1) run the following to install all your dependencies
```shellscript 
npm install
```
2) run to following to create the first migration 
```shellscript
npx mikro-orm-esm migration:create
``` 
3) run the following to create the database and apply the migration
```shellscript s
npx mikro-orm-esm migration:up
``` 

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
