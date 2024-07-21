// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error mikro-orm cli expects file extension
// noinspection ES6PreferShortImport: cli does not like the use of aliases in the path. use full path
import {config} from "./app/.server/lib/database/config.ts";

export default config
