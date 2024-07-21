import {Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
//@ts-expect-error mikro-orm cli expects file extension
import {type User, userEntity} from "../users/user.entity.ts";

@Entity()
export class UserRole {
	@PrimaryKey({name: 'pkiUserRoleId', type: 'int'})
	id!: number;

	@Property({name: 'txtDescription', type: 'string'})
	description!: string;

	@OneToMany(() => userEntity.name, (user: User) => user.userRole)
	users = new Collection<User>(this);

	constructor(id: number, description: string) {
		this.id = id;
		this.description = description;
	}
}

export const userRoleEntity = {name: 'UserRole', schema: UserRole}
