# Remixing Mikro-orm

This is a bare-bones test project to implement [mikro-orm](https://mikro-orm.io/) and [Remix (vite plugin)](https://remix.run/).

## Getting started

1) run npm install
2) run npx mikro-orm-esm migration:create to create the first migration
3) run npx mikro-orm-esm migration:up to create the database and apply the migration

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
