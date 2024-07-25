import {type ActionFunctionArgs, redirect} from "@remix-run/node";
import {initORM} from "~/.server/lib/database/db";
import {userEntity} from "~/.server/lib/users/user.entity";

export const action = async ({params}: ActionFunctionArgs) => {
	console.log('delete: ', params.id)

	const db = (await initORM()).em.fork();

	await db.nativeDelete(userEntity.name, {id: params.id})
	return redirect('/');
}
