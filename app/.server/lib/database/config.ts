// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck mikro-orm cli expects file extension for listed entities
import {defineConfig, EntityCaseNamingStrategy, ReflectMetadataProvider} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";
import {SeedManager} from "@mikro-orm/seeder";
import pluralize from "pluralize";

import {userEntity} from '../users/user.entity.ts';
import {userRoleEntity} from '../userRoles/userRole.entity.ts';

import type {NamingStrategy} from "@mikro-orm/better-sqlite";

class TableNamingStrategy extends EntityCaseNamingStrategy implements NamingStrategy {
	classToTableName(entityName: string): string {
		return `tbl` + pluralize(entityName);
	}
}

export const config = defineConfig({
	entities: [userEntity.schema, userRoleEntity.schema],
	dbName: 'test.db',
	migrations: {
		path: './app/.server/lib/database/migrations',
	},
	seeder: {
		defaultSeeder: 'DatabaseSeeder',
		path: './app/.server/lib/database/seeders',
	},
	extensions: [Migrator, SeedManager],
	metadataProvider: ReflectMetadataProvider,
	namingStrategy: TableNamingStrategy
});
