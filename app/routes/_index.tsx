import {type ActionFunctionArgs, json, type MetaFunction} from "@remix-run/node";
import {initORM} from "~/.server/lib/database/db";
import {Form, useLoaderData} from "@remix-run/react";
import {User, userEntity} from "~/.server/lib/users/user.entity";
import {userRoleEntity} from "~/.server/lib/userRoles/userRole.entity";

export const loader = async () => {
	const db = (await initORM()).em.fork();

	const users = await db.findAll(userEntity.schema);

	const userRoles = await db.findAll(userRoleEntity.schema, {populate: ['users']});

	return json({users, userRoles})
}

export const action = async ({request}: ActionFunctionArgs) => {
	const formData = await request.formData();

	const user = new User(Object.fromEntries(formData) as unknown as User);

	const db = (await initORM()).em.fork();

	db.persist(user);

	await db.flush();

	return null
}

export const meta: MetaFunction = () => {
	return [
		{title: "New Remix App"},
		{name: "description", content: "Welcome to Remix!"},
	];
};

export default function Index() {
	const {users, userRoles} = useLoaderData<typeof loader>();

	return (
		<div className="font-sans p-4">
			<div className={'flex flex-row gap-4'}>
				<div className={'flex flex-col'}>
					<Form method="POST">
						<div className={'flex flex-row gap-1'}>
							<label htmlFor="name">Name</label>
							<input id='name' type="text" name='name' placeholder={'name'}
								className={'border-2 border-gray-500'}/>
						</div>
						<div className={'flex flex-row gap-1 mb-2'}>
							<label htmlFor="name">Email</label>
							<input id='email' type="text" name='email' placeholder={'email'}
								className={'border-2 border-gray-500'}/>
						</div>
						<div className={'flex flex-row gap-1 mb-2'}>
							<label htmlFor="name">Role</label>
							<select id='userRole' name='userRole'>
								{userRoles.map((role) => <option key={role.id}
									value={role.id}>{role.description}</option>)}
							</select>
						</div>
						<button type={"submit"} className={'bg-blue-600 rounded p-1'}>
							Submit
						</button>
					</Form>
				</div>
				<div className={'flex flex-col'}>
					{users.map((user) => (
						<Form method="POST" action={`/delete/${user.id}`} key={user.id}
							onSubmit={(event) => {
								const response = confirm(
									"Please confirm you want to delete this record."
								);
								if (!response) {
									event.preventDefault();
								}
							}}>
							<div>
								{user.id}: {user.name} - {user.email} ({user.userRole.description})
								<button type={'submit'} className={'pl-2'}>X</button>
							</div>
						</Form>
					))}
					<br/>
					{userRoles.map((role, index) => (
						<div key={role.id} className={'flex flex-row gap-3'}>
							<div>{index === 0 ? <strong>Roles</strong> : null}
							<div>{role.description}</div>
							</div>
							<div>{index === 0 ? <strong>Users</strong> : null}
							{role.users.map((user) => (
								<div key={user.id}>{user.id} - {user.name}</div>
							))
							}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
