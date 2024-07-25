import {Collection, EntitySchema} from "@mikro-orm/core";
import {type User, userEntity} from "~/.server/lib/users/user.entity";

export class UserRole {
	id!: number;

	description!: string;

	users = new Collection<User>(this);

	constructor({description}: {description: string}) {
		this.description = description;
	}
}

const userRoleEntitySchema = new EntitySchema<UserRole>({
	class: UserRole,
	tableName: 'tblUserRoles',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true},
		description: {type: 'string', name: 'txtDescription'},
		users: {kind: '1:m', entity: () => userEntity.schema, mappedBy: e => e.userRole, lazy: true},
	}
});

export const userRoleEntity = {schema: userRoleEntitySchema}
