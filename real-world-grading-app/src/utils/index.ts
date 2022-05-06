export const genericTryCatch = async (callback: Function, options?: {}) => {
	try {
		return await callback();
	} catch (err) {
		err instanceof Error
			? console.error(err.message)
			: typeof err === 'object'
			? console.dir(err)
			: console.error(err);
	}
};
