import {EntitySchema} from "@mikro-orm/core";

export interface UserEntity {
	id: number;
	name: string;
	email: string;
}

export const schema = new EntitySchema<UserEntity>({
	name: 'UserEntity',
	properties: {
		id: {type: 'int', autoincrement: true, primary: true},
		name: {type: 'string'},
		email: {type: 'string'},
	}
});
