import {type ActionFunctionArgs, redirect} from "@remix-run/node";
import {initORM} from "~/.server/lib/database/db";
import {userEntity} from "~/.server/lib/users/user.entity";

export const action = async ({params}: ActionFunctionArgs) => {
	console.log('delete: ', params.id)

	if (!params.id) {
		throw new Error("Missing user id param")
	}

	const db = (await initORM()).em.fork();

	await db.nativeDelete(userEntity.schema, {id: parseInt(params.id)})
	return redirect('/');
}
