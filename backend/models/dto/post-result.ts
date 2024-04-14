export interface PostResult {
	resultType: ResultType;
	actionType: ActionType;
	errorMessages: string[];
	value: { [key: string]: any };
}

export const initPostResult = (): PostResult => {
	const postResult = {} as PostResult;

	postResult.resultType = ResultType.Failed;
	postResult.actionType = ActionType.Insert;
	postResult.errorMessages = [];
	postResult.value = {};

	return postResult;
};

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
