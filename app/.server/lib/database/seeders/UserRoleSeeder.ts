import {Seeder} from "@mikro-orm/seeder";
import {EntityManager} from "@mikro-orm/core";
import {UserRole} from "~/.server/lib/userRoles/userRole.entity";

export class UserRoleSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const userRolesInDb = await em.findAll<UserRole>('UserRole');

		const userRolesToCreate = [{id: 1, description: 'admin'},{id: 2, description: 'user'}]

		userRolesToCreate.forEach((userRole) => {
			if (!userRolesInDb.find(role => role.id === userRole.id)) {
				em.create('UserRole', userRole);
			}
		})
	}
}
