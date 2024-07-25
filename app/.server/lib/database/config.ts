import {defineConfig, EntityCaseNamingStrategy, ReflectMetadataProvider} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";
import {SeedManager} from "@mikro-orm/seeder";
import pluralize from "pluralize";

import {User} from '~/.server/lib/users/user.entity';
import {userRoleSchema as UserRole} from '~/.server/lib/userRoles/userRole.entity';

import type {NamingStrategy} from "@mikro-orm/better-sqlite";

class TableNamingStrategy extends EntityCaseNamingStrategy implements NamingStrategy {
	classToTableName(entityName: string): string {
		return `tbl` + pluralize(entityName);
	}
}

export const config = defineConfig({
	entities: [User, UserRole],
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
	namingStrategy: TableNamingStrategy,
	dynamicImportProvider: id => import(/* @vite-ignore */ id),
});
