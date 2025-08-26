export type FormSendCallValues = {
	phone: string;
	file?: File | null;
	username?: string;
	type: string;
	specialist: {
		name: string;
		hours: number;
		price: number;
	};
};
