import {EntitySchema} from "@mikro-orm/core";
import {type UserRole} from "../userRoles/userRole.entity";

export interface User {
	id: number;
	name: string;
	email: string;
	userRole: UserRole;
}

const userEntitySchema = new EntitySchema<User>({
	name: 'User',
	tableName: 'tblUsers',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true},
		name: {type: 'string', name: 'txtUsername'},
		email: {type: 'string', name: 'txtEmail'},
		userRole: {kind: 'm:1', entity: 'UserRole', nullable: false, name: 'fkiUserRoleId', eager: true},
	}
});

export const userEntity = {name: 'User', schema: userEntitySchema};
