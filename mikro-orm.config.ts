import {defineConfig} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";

//we must have the full path with the extension.
//the extension is required by mikro-orm cli
//and the fullpath by vite dynamic import
//exported schema must be called schema when using EntitySchema definitions
const getEntities = [
	"./app/lib/user.entity.ts",
]

export const schema = await Promise.all(getEntities.map(entity => {
	return import(/* @vite-ignore */ entity)
}));


export const config = defineConfig({
	entities: [...schema],
	dbName: 'test.db',
	migrations: {
		path: './app/lib/database/migrations',
	},
	extensions: [Migrator]
});


export default config
