import Hapi from '@hapi/hapi';
import prismaPlugin from './plugins/prisma';
import statusPlugin from './plugins/status';
import userPlugin from './plugins/users';

const server: Hapi.Server = Hapi.server({
	port: process.env.PORT || 3000,
	host: process.env.HOST || 'localhost',
});

/**
 * `createServer()`: Registers the plugins and initializes the server
 */
export const createServer = async (): Promise<Hapi.Server> => {
	// server.route({
	// 	method: 'GET',
	// 	path: '/',
	// 	handler: (_, h: Hapi.ResponseToolkit) => {
	// 		return h.response({ up: true }).code(200);
	// 	},
	// });
	await server.register([statusPlugin, prismaPlugin, userPlugin]);
	//  initializes the server (starts the caches, finalizes plugin registration) but does not start listening on the connection port.
	await server.initialize();

	return server;
};

/**
 * `startServer()`: Starts the server
 */
export const startServer = async (): Promise<Hapi.Server> => {
	await server.start();
	console.log(`Server running on ${server.info.uri}`);
	return server;
};

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

// startServer()
// 	.then((server) => {
// 		console.log(`Server running on ${server.info.uri}`);
// 	})
// 	.catch((err) => {
// 		console.error(err.message);
// 	});
