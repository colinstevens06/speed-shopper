export interface ApiException {
	exceptionMessage: string;
	details: string;
	referenceErrorCode: string;
	referenceDocumentLink: string;
	validationErrors: string[];
}
