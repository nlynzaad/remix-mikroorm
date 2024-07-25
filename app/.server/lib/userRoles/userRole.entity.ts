import {Collection, EntitySchema} from "@mikro-orm/core";
import {User} from "~/.server/lib/users/user.entity";

export class UserRole {
	id!: number;

	description!: string;

	users = new Collection<User>(this);

	constructor({description}: {description: string}) {
		this.description = description;
	}
}

export const userRoleSchema = new EntitySchema<UserRole>({
	class: UserRole,
	tableName: 'tblUserRoles',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true, name: 'pkiUserRoleId'},
		description: {type: 'string', name: 'txtDescription'},
		users: {kind: '1:m', entity: () => User, mappedBy: e => e.userRole, lazy: true},
	}
});
