export const genericTryCatch = async (
	callback: Function,
	options?: {
		onError?: Function;
	}
) => {
	try {
		return await callback();
	} catch (err) {
		err instanceof Error
			? console.error(err.message)
			: typeof err === 'object'
			? console.dir(err)
			: console.error(err);

		if (options?.onError) return await options.onError(err);
	}
};
