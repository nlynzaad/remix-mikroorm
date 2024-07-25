import {Seeder} from "@mikro-orm/seeder";
import {EntityManager} from "@mikro-orm/core";
import {UserRole} from "~/.server/lib/userRoles/userRole.entity";

export class UserRoleSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const userRolesInDb = await em.findAll(UserRole);

		const userRolesToCreate = [
			new UserRole({description: 'admin'}),
			new UserRole({description: 'user'})
		]

		let blnShouldFlush = false;
		userRolesToCreate.forEach((userRole) => {
			if (!userRolesInDb.find(role => role.description === userRole.description)) {
				blnShouldFlush = true;
				em.persist(userRole);
			}
		})

		if (blnShouldFlush) {
			await em.flush();
		}
	}
}
