import {Seeder} from "@mikro-orm/seeder";
import {EntityManager} from "@mikro-orm/core";
import {userRoleEntity} from "~/.server/lib/userRoles/userRole.entity";

export class UserRoleSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const userRolesInDb = await em.findAll(userRoleEntity.schema);

		const userRolesToCreate = [
			{id: 1, description: 'admin'},
			{id: 2, description: 'user'}
		]

		userRolesToCreate.forEach((userRole) => {
			if (!userRolesInDb.find(role => role.id === userRole.id)) {
				em.create(userRoleEntity.schema, userRole);
			}
		})
	}
}
