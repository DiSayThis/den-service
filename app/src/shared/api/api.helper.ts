import axios from 'axios';

export const getContentType = () => ({
	'Content-Type': 'application/json',
});

export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message;
	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error?.message;
};

export const axiosErrorCatch = (error: unknown) => {
	if (axios.isAxiosError(error) && error.response) {
		const status = error.response.status;
		const message = error.response.data.message
			? typeof error.response.data.message === 'object'
				? error.response.data.message[0]
				: error.response.data.message
			: error.response.data;
		return { status, message };
	}
	return;
};
