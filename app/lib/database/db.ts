import {EntityManager, MikroORM, Options} from '@mikro-orm/better-sqlite';
import dbConfig from "~/../mikro-orm.config";

export interface Services {
	orm: MikroORM;
	em: EntityManager;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
	if (cache) {
		return cache;
	}

	const orm = await MikroORM.init({...dbConfig, ...options});

	return (cache = {
		orm,
		em: orm.em,
	});
}
