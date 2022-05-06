import { createServer } from '../src/server';
import Hapi from '@hapi/hapi';

describe('POST /users - create user', () => {
	let server: Hapi.Server;

	beforeAll(async () => {
		server = await createServer();
	});

	afterAll(async () => {
		await server.stop();
	});

	let userId;

	test('create user', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			payload: {
				firstName: 'test-first-name',
				lastName: 'test-last-name',
				email: `test-${Date.now()}@prisma.io`,
				social: {
					twitter: 'thisisalice',
					website: 'https://www.thisisalice.com',
				},
			},
		});

		console.log(response.payload);
		expect(response.statusCode).toEqual(201);
		userId = JSON.parse(response.payload)?.id;
		expect(typeof userId === 'number').toBeTruthy();
	});

	test('create user validation error', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			payload: {
				lastName: 'test-last-name',
				email: `test-${Date.now()}@prisma.io`,
				social: {
					twitter: 'thisisalice',
					website: 'https://www.thisisalice.com',
				},
			},
		});

		console.log(response.payload);
		expect(response.statusCode).toEqual(400);
	});
});
