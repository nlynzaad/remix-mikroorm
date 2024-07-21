// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck mikro-orm cli expects file extension for listed entities
import {
	defineConfig,
	EntityCaseNamingStrategy,
	type NamingStrategy,
	ReflectMetadataProvider
} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";
import {userEntity} from '../users/user.entity.ts';
import {userRoleEntity} from '../userRoles/userRole.entity.ts';
import pluralize from "pluralize";
import {SeedManager} from "@mikro-orm/seeder";

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
	namingStrategy:TableNamingStrategy
});
