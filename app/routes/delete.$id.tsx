import {type ActionFunctionArgs, redirect} from "@remix-run/node";
import {initORM} from "~/.server/lib/database/db";
import {User} from "~/.server/lib/users/user.entity";

export const action = async ({params}: ActionFunctionArgs) => {
	if (!params.id) {
		throw new Response("Missing user id param", {status: 404})
	}

	try {
		const userId = parseInt(params.id);
		const db = (await initORM()).em.fork();
		const user = db.getReference(User, userId);

		if (user) {
			db.remove(user);

			await db.flush();
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Response(err.message, {status: 404})
		}
		throw new Response('Unknown error deleting user', {status: 404})
	}

	return redirect('/');
}
