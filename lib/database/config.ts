//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
/*
Mikro-orm cli expects the extension, while vite/remix/typescript does not.

This can be allowed in typescript for the whole project using allowImportingTsExtensions
but seeing as this has been secluded to its own file that is purely configuration,
we can just disable the type check here
 */

import {defineConfig} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";

import UserEntitySchema from "../user.entity.ts";

export const config = defineConfig({
	entities: [UserEntitySchema],
	dbName: 'test.db',
	migrations: {
		path: './lib/database/migrations'
	},
	extensions: [Migrator],
	tsNode: true
});
export default config;
