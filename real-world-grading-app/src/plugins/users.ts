import Hapi from '@hapi/hapi';
import Joi from 'joi';

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
					},
				},
			},
		]);
	},
};

export default userPlugin;
