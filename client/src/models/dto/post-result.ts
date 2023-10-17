export interface PostResult<T> {
	resultType: ResultType;
	actionType: ActionType;
	errorMessages: string[];
	value: T;
}

export enum ResultType {
	Success = 'success',
	Failed = 'failed'
}

export enum ActionType {
	Update = 'update',
	Insert = 'insert',
	Delete = 'delete',
	NotFound = 'notfound'
}
