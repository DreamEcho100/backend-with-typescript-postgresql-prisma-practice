import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
declare module '@hapi/hapi' {
	interface ServerApplicationState {
		prisma: PrismaClient;
	}
}

import { genericTryCatch } from '../utils';

interface UserInput {
	firstName: string;
	lastName: string;
	email: string;
	social: {
		facebook?: string;
		twitter?: string;
		github?: string;
		website?: string;
	};
}
const userInputValidator = Joi.object<UserInput>({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().required(),
	social: Joi.object({
		facebook: Joi.string().optional(),
		twitter: Joi.string().optional(),
		github: Joi.string().optional(),
		website: Joi.string().optional(),
	}).optional(),
});

/**
 * @param Type
 * `POST`
 * @param Path
 * `users`
 */
const registerHandler = async (
	request: Hapi.Request,
	h: Hapi.ResponseToolkit
) => {
	const { prisma } = request.server.app;
	const payload = request.payload as UserInput;

	return await genericTryCatch(async () => {
		const createdUser = await prisma.user.create({
			data: {
				firstName: payload.firstName,
				lastName: payload.lastName,
				email: payload.email,
				social: JSON.stringify(payload.social),
			},
			select: {
				id: true,
			},
		});

		return h.response(createdUser).code(201);
	});
};

const getUsersHandler = async (
	request: Hapi.Request,
	h: Hapi.ResponseToolkit
) => {
	// return h.response(request).code(200);
	const { prisma } = request.server.app;
	const params = request.params as { userId: string };
	const userId = parseInt(params.userId, 10);

	return await genericTryCatch(
		async () => {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
			});

			if (!user) {
				return h.response().code(404);
			} else {
				return h.response(user).code(200);
			}
		},
		{
			onError: () => Boom.badImplementation(),
		}
	);
};

/**
 * plugin to instantiate Prisma Client
 */
const userPlugin: Hapi.Plugin<null> = {
	name: 'app/users',
	dependencies: ['prisma'],
	register: async (server: Hapi.Server) => {
		server.route([
			{
				method: 'POST',
				path: '/users',
				handler: registerHandler,
				options: {
					validate: {
						payload: userInputValidator,
						failAction: (request, h, err) => {
							// show validation errors to user https://github.com/hapijs/hapi/issues/3706
							throw err;
						},
					},
				},
			},
			{
				method: 'GET',
				path: '/users/{userId}',
				handler: getUsersHandler,
				options: {
					validate: {
						params: Joi.object<{ userId: number }>({
							userId: Joi.string().pattern(/^[0-9]*$/),
						}),
						failAction: (request, h, err) => {
							// show validation errors to user https://github.com/hapijs/hapi/issues/3706
							throw err;
						},
					},
				},
			},
		]);
	},
};

export default userPlugin;
