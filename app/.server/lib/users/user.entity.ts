import {EntitySchema} from "@mikro-orm/core";
//@ts-expect-error mikro-orm cli expects file extension
import {type UserRole, userRoleEntity} from "../userRoles/userRole.entity.ts";

export interface User {
	id: number;
	name: string;
	email: string;
	userRole: UserRole;
}

const entityName = 'User';

const userEntitySchema = new EntitySchema<User>({
	name: entityName,
	tableName: 'tblUsers',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true},
		name: {type: 'string', name: 'txtUsername'},
		email: {type: 'string', name: 'txtEmail'},
		userRole: {kind: 'm:1', entity: () => userRoleEntity.name, nullable: false, name: 'fkiUserRoleId', eager: true},
	}
});

export const userEntity = {name: entityName, schema: userEntitySchema};
