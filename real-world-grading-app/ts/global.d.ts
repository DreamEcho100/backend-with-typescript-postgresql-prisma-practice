import { PrismaClient } from '@prisma/client';

// Property 'prisma' does not exist on type 'ServerApplicationState'
declare module '@hapi/hapi' {
	interface ServerApplicationState {
		prisma: PrismaClient;
	}
}

declare global {
	var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}
