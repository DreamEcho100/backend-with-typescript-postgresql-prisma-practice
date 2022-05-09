export const genericTryCatch = async (
	callback: Function,
	options?: {
		onError?: Function;
	}
) => {
	try {
		return await callback();
	} catch (err) {
		if (options?.onError) return await options.onError(err);
	}
};

export const printError = (
	err: any,
	options?: {
		default?: string;
	}
) => {
	err instanceof Error
		? console.error(err.message)
		: options?.default
		? console.error(options?.default)
		: typeof err === 'object'
		? console.dir(err)
		: console.error(err);
};
