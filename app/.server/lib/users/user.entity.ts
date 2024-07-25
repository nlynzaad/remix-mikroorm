import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {type UserRole, userRoleEntity} from "~/.server/lib/userRoles/userRole.entity";

@Entity()
export class User {
	@PrimaryKey({name: 'pkiUserId', type: 'int', autoincrement: true, unique: true})
	id!: number;

	@Property({name: 'txtName', type: 'string'})
	name: string;

	@Property({name: 'txtEmail', type: 'string'})
	email: string;

	@ManyToOne({entity: () => userRoleEntity.schema, inversedBy: e=> e.users, eager: true, name: 'fkiUserRoleId'})
	userRole: UserRole;

	constructor({name, email, userRole}: User) {
		this.name = name;
		this.email = email;
		this.userRole = userRole;
	}
}

export const userEntity = {schema: User};
