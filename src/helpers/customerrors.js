class CustomError extends Error {
	constructor(errorData, ...params) {
		super(...params);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError);
		}

		this.name = errorData?.name || 'FetchNetworkError';
		this.status = errorData?.status;
		this.date = new Date();
		this.message = errorData?.message;
		this.data = errorData?.data;
	}
}

export default CustomError;
