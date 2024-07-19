import {type ActionFunctionArgs, json, type MetaFunction} from "@remix-run/node";
import {initORM} from "../../lib/database/db";
import {Form, useLoaderData} from "@remix-run/react";
import UserEntitySchema, {type UserEntity} from "../../lib/user.entity";

export const loader = async () => {
	const db = (await initORM()).em.fork();
	const users = await db.getRepository(UserEntitySchema).findAll();
	return json({users})
}

export const action = async ({request}: ActionFunctionArgs) => {
	const formData = await request.formData();
	const user = Object.fromEntries(formData) as unknown as UserEntity;

	const db = (await initORM()).em.fork();

	db.create(UserEntitySchema, user)
	await db.flush();
	return json({user})
}

export const meta: MetaFunction = () => {
	return [
		{title: "New Remix App"},
		{name: "description", content: "Welcome to Remix!"},
	];
};

export default function Index() {
	const {users} = useLoaderData<typeof loader>();

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
						<button type={"submit"} className={'bg-blue-600 rounded p-1'}>Submit</button>
					</Form>
				</div>
				<div className={'flex flex-col'}>
					{users.map((user) => (
						<div key={user.id}>{user.id}: {user.name} - {user.email}</div>
					))}
				</div>
			</div>
		</div>
	);
}
