export type UserFormData = {
	name: string;
	username: string;
	password: string;
};

export type EntryFormData = {
	title: string;
	description?: string;
	tag: string;
	type: string;
	value: number;
};
