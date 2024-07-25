# Remixing Mikro-orm

This is a bare-bones test project to implement [mikro-orm](https://mikro-orm.io/) and [Remix (vite plugin)](https://remix.run/).

This generally just works the only real quirk is the requirement by the CLI, to include the file extension for ESM projects. 

Given that remix uses vite and hence the project is bundled with esbuild the requirement for file extensions does not really make sense. 

Using tsx instead of ts-node resolves all the pain points, so I have added an extra script in package.json to call the mikro-orm esm cli tool via tsx instead of the default ts-node usage. There is talk of possibly replacing ts-node in future releases of mikro-orm [discussion](https://github.com/mikro-orm/mikro-orm/discussions/5275). 

This test is now feature complete as it answers all the questions I had in implementing this stack.

### NOTE: I'm making this public in the hope it can assist someone that wants to do a similar stack. No support can and will be given on this.

## Getting started

1) run the following to install all your dependencies
```shellscript 
npm install
```
2) run to following to create the first migration 
```shellscript
npm run mikro-orm migration:create
``` 
3) run the following to create the database and apply the migration
```shellscript s
npm run mikro-orm migration:up
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
