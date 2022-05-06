import { createServer, startServer } from './server';

createServer()
	.then(startServer)
	.catch((err) => console.error(err.message));
