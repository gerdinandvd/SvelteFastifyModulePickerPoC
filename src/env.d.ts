// env.d.ts (create this file in src/)
declare namespace NodeJS {
	interface ProcessEnv {
		MONGODB_URL: string;
	}
}
