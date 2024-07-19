import {EntitySchema} from "@mikro-orm/core";

export interface UserEntity {
	id: number;
	name: string;
	email: string;
}

const UserEntitySchema = new EntitySchema<UserEntity>({
	name: 'User',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true},
		name: {type: 'string'},
		email: {type: 'string'},
	}
})

export default UserEntitySchema;
