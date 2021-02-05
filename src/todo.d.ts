export interface ITodo {
	id: string;
	task: string;
	completed: boolean;
	dueDate: string;
}

export enum Filter {
	All = 'ALL',
	Completed = 'COMPLETED',
	Incomplete = 'INCOMPLETE',
}
