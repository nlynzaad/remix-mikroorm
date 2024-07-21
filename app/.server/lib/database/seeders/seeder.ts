// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck mikro-orm cli expects file extension for listed entities
import {Seeder} from "@mikro-orm/seeder";
import type {EntityManager} from "@mikro-orm/better-sqlite";
import {UserRoleSeeder} from "./UserRoleSeeder.ts";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [
			UserRoleSeeder
		])
	}
}
