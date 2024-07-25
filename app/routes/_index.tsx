import {type ActionFunctionArgs, json, type MetaFunction} from "@remix-run/node";
import {initORM} from "~/.server/lib/database/db";
import {Form, useLoaderData} from "@remix-run/react";
import {User} from "~/.server/lib/users/user.entity";
import {UserRole} from "~/.server/lib/userRoles/userRole.entity";

export const loader = async () => {
	const db = (await initORM()).em.fork();

	const users = await db.findAll(User);

	const userRoles = await db.findAll(UserRole, {populate: ['users']});

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
		{title: "Remixing Mikro-Orm"},
		{name: "description", content: "Welcome to Remix & Mikro-Orm!"},
	];
};

export default function Index() {
	const {users, userRoles} = useLoaderData<typeof loader>();

	return (
		<div className="font-sans p-4">
			<div className={'flex flex-row gap-8'}>
				<div className={'flex flex-col border-2 border-black p-2'}>
					<div><strong>Create User</strong></div>
					<hr className={'h-[1px] border-none text-black bg-black mb-4 p-0'}/>
					<Form method="POST">
						<div className={'flex flex-col'}>
							<div className={'flex flex-row gap-5'}>
								<div className={'flex flex-col gap-1'}>
									<label htmlFor="name" className='pt-[2px]'>Name</label>
									<label htmlFor="email" className='pt-[2px]'>Email</label>
									<label htmlFor="userRole" className={'pt-[2px]'}>Role</label>
								</div>
								<div className={'flex flex-col gap-1'}>
									<input id='name' type="text" name='name' placeholder={'name'}
										className={'border-2 border-gray-500'}/>
									<input id='email' type="text" name='email' placeholder={'email'}
										className={'border-2 border-gray-500'}/>
									<select id='userRole' name='userRole'
										className={'border-2 border-gray-500 bg-white'}>
										{userRoles.map((role) => <option key={role.id}
											value={role.id}>{role.description}</option>)}
									</select>
								</div>
							</div>
							<button type={"submit"} className={'bg-blue-600 rounded p-1 mt-4'}>
								Create
							</button>
						</div>
					</Form>
				</div>
				<div className={'flex flex-col'}>
					<div><strong>Users loaded</strong></div>
					<hr className={'h-[1px] border-none text-black bg-black mb-2 p-0'}/>
					{users.length === 0 ? <div>None</div> : null}
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
							<div className={'justify-between flex flex-row'}>
								<div>{user.id}: {user.name} - {user.email} ({user.userRole.description})</div>
								<button type={'submit'} className={'text-blue-700 underline pl-5'}>delete</button>
							</div>
						</Form>
					))}
					<br/>
					<div><strong>User Role to User Map</strong></div>
					<hr className={'h-[0.5px] border-none text-black bg-black mb-2 p-0'}/>
					{userRoles.map((role, index) => (
						<div key={role.id} className={'flex flex-row justify-between'}>
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
