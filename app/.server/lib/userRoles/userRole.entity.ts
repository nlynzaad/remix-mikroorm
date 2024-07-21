import {Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import type {User} from "../users/user.entity";

@Entity()
export class UserRole {
	@PrimaryKey({name: 'pkiUserRoleId', type: 'int'})
	id!: number;

	@Property({name: 'txtDescription', type: 'string'})
	description!: string;

	@OneToMany(() => 'User', (user: User) => user.userRole)
	users = new Collection<User>(this);


	constructor(id: number, description: string) {
		this.id = id;
		this.description = description;
	}
}
