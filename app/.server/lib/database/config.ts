import {defineConfig, ReflectMetadataProvider} from "@mikro-orm/better-sqlite";
import {Migrator} from "@mikro-orm/migrations";
import {SeedManager} from "@mikro-orm/seeder";

import {User} from '~/.server/lib/users/user.entity';
import {userRoleSchema as UserRole} from '~/.server/lib/userRoles/userRole.entity';

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
	dynamicImportProvider: id => import(/* @vite-ignore */ id),
});
